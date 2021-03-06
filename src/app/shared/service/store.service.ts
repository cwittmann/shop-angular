import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../enum/OrderStatus';
import { Image } from '../model/Image';
import { OrderViewModel } from '../model/OrderViewModel';
import { OrderService } from './order.service';
import { User } from '../model/User';
import { Manufacturer } from '../model/Manufacturer';
import { Product } from '../model/Product';
import { OrderLine } from '../model/OrderLine';
import { Right } from '../model/Right';
import { RoleRight } from '../model/RoleRight';
import { Role } from '../model/Role';
import { BaseModel } from '../model/BaseModel';
import { Category } from '../model/Category';
import { Order } from '../model/Order';
import { Attribute } from '../model/Attribute';
import { SortService } from './sort.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  orders: OrderViewModel[] = [];
  currentOrder: OrderViewModel;
  manufacturers: Manufacturer[] = [];
  products: Product[] = [];
  categories: Category[] = [];
  attributes: Attribute[] = [];
  orderLines: OrderLine[] = [];
  users: User[] = [];
  roles: Role[] = [];
  rights: Right[] = [];
  roleRights: RoleRight[] = [];
  currentUser: User;

  images: Image[];

  shoppingCart: OrderViewModel;

  loading: boolean = false;

  constructor(
    private backendService: BackendService,
    private orderService: OrderService,
    private sortService: SortService
  ) {}

  async initialize(userName: string): Promise<boolean> {
    this.loading = true;

    await this.loadData();
    await this.loadUser(userName);
    await this.initializeShoppingCart();

    this.loading = false;

    return true;
  }

  async reload() {
    this.loading = true;
    await this.loadData();
    this.initializeShoppingCart();
    this.loading = false;
  }

  post<T>(item: T, dbNamePlural: string) {
    this.backendService.post<T>(item, dbNamePlural);
  }

  put<T extends BaseModel>(item: T, dbNamePlural: string) {
    this.backendService.put<T>(item, dbNamePlural);
  }

  delete<T>(id: string, dbNamePlural: string) {
    this.backendService.delete<T>(id, dbNamePlural);
  }

  postImage(item: FormData) {
    this.backendService.postImage(item);
  }

  loadUser(userName: string) {
    this.currentUser = this.users.find((user) => user.userName === userName);
  }

  async loadOrder(id: string) {
    this.loading = true;

    let loadedOrder = await this.orders.find((order) => order.id === id);

    let currentOrderLines: OrderLine[] = [];

    for (let orderLine of loadedOrder.orderLines) {
      let currentOrderLine = new OrderLine(
        orderLine.id,
        orderLine.orderId,
        orderLine.amount,
        orderLine.product
      );

      currentOrderLines.push(currentOrderLine);
    }

    this.currentOrder = new OrderViewModel(
      loadedOrder.id,
      loadedOrder.date,
      loadedOrder.status,
      currentOrderLines,
      loadedOrder.user
    );

    this.loading = false;
  }

  async postOrderViewModel() {
    await this.orderService.postOrder(this.shoppingCart);
    await this.shoppingCart.clear(this.currentUser);
    this.reload();
  }

  sort(itemsName: string, attributes: string[], orderByDescending: boolean) {
    this[itemsName] = this.sortService.sortByAttributes(
      this[itemsName],
      attributes,
      orderByDescending
    );
  }

  private initializeShoppingCart() {
    this.shoppingCart = new OrderViewModel(
      uuidv4(),
      new Date(),
      OrderStatus.Created,
      [],
      this.currentUser
    );
  }

  private async loadData() {
    let imagePromise = this.loadImages();
    let userPromise = this.loadUsersAndSubEntities();
    let productPromise = this.loadProductsAndSubEntities();
    let orderLinePromise = this.loadOrderLines();

    await Promise.all([
      imagePromise,
      userPromise,
      productPromise,
      orderLinePromise,
    ]);

    this.appendUsersToOrders();
    this.sortItems();
  }

  private async loadOrderLines(): Promise<boolean> {
    this.orderLines = (await this.backendService.get<OrderLine[]>(
      'orderLines'
    )) as OrderLine[];
    this.orders = (await this.backendService.get<Order[]>(
      'orders'
    )) as OrderViewModel[];
    this.appendOrderLinesToOrders();

    return new Promise((resolve) => {
      resolve(true);
    });
  }

  private async loadProductsAndSubEntities(): Promise<boolean> {
    this.manufacturers = (await this.backendService.get<Manufacturer[]>(
      'manufacturers'
    )) as Manufacturer[];
    this.categories = (await this.backendService.get<Category[]>(
      'categories'
    )) as Manufacturer[];
    this.products = (await this.backendService.get<Product[]>(
      'products'
    )) as Product[];
    this.attributes = (await this.backendService.get<Attribute[]>(
      'attributes'
    )) as Attribute[];
    this.appendCategoriesToProducts();
    this.appendAttributesToProducts();
    this.appendManufacturersToProducts();

    return new Promise((resolve) => {
      resolve(true);
    });
  }

  private async loadUsersAndSubEntities(): Promise<boolean> {
    this.rights = (await this.backendService.get<Right[]>('rights')) as Right[];
    this.rights.forEach(
      (right) => (right.name = right.entity + ' - ' + right.permission)
    );

    this.roleRights = (await this.backendService.get<RoleRight[]>(
      'roleRights'
    )) as RoleRight[];
    this.roles = (await this.backendService.get<Role[]>('roles')) as Role[];

    this.appendRolesAndRightsToRoleRights();
    this.appendRightsToRoles();

    this.users = (await this.backendService.get<User[]>('users')) as User[];
    this.users.forEach(
      (user) => (user.name = user.lastName + ', ' + user.firstName)
    );
    this.appendRolesToUsers();

    return new Promise((resolve) => {
      resolve(true);
    });
  }

  private async loadImages(): Promise<boolean> {
    let imageObjects = (await this.backendService.getImages()) as Image[];
    this.convertImages(imageObjects);

    return new Promise((resolve) => {
      return resolve(true);
    });
  }

  private sortItems() {
    this.sort(RoleRight.dbNamePlural, ['roleId', 'rightId'], true);
    this.sort(Right.dbNamePlural, ['entity', 'permission'], true);
    this.sort(Role.dbNamePlural, ['name'], true);
    this.sort(User.dbNamePlural, ['lastName', 'firstName'], true);
    this.sort(Category.dbNamePlural, ['name'], true);
    this.sort(Manufacturer.dbNamePlural, ['name'], true);
    this.sort(Product.dbNamePlural, ['name'], true);
    this.sort(Order.dbNamePlural, ['date'], false);
  }

  private convertImages(imageObjects: Image[]) {
    if (!this.images) {
      this.images = [];
    }

    for (let imageObject of imageObjects) {
      let image = new Image(imageObject.id, imageObject.data);
      this.images.push(image);
    }
  }

  private appendRightsToRoles() {
    for (let role of this.roles) {
      if (!role.rights) {
        role.rights = [];
      }

      let roleRights = this.roleRights.filter(
        (roleRight) => roleRight.roleId === role.id
      );

      for (let roleRight of roleRights) {
        let right = this.rights.find((right) => right.id === roleRight.rightId);
        role.rights.push(right);
      }
    }
  }

  private appendRolesAndRightsToRoleRights() {
    for (let roleRight of this.roleRights) {
      let role = this.roles.find((role) => role.id === roleRight.roleId);
      let right = this.rights.find((right) => right.id === roleRight.rightId);
      roleRight.role = role;
      roleRight.right = right;
    }
  }

  private appendRolesToUsers() {
    for (let user of this.users) {
      let role = this.roles.find((role) => role.id === user.roleId);
      user.role = role;
    }
  }

  private appendCategoriesToProducts() {
    for (let product of this.products) {
      let category = this.categories.find(
        (category) => category.id === product.categoryId
      );
      product.category = category;
    }
  }

  private appendAttributesToProducts() {
    for (let product of this.products) {
      if (!product.attributes) {
        product.attributes = [];
      }

      let attributes = this.attributes.filter(
        (attribute) => attribute.productId === product.id
      );

      for (let attribute of attributes) {
        product.attributes.push(attribute);
      }
    }
  }

  private appendManufacturersToProducts() {
    for (let product of this.products) {
      let manufacturer = this.manufacturers.find(
        (manufacturer) => manufacturer.id === product.manufacturerId
      );
      product.manufacturer = manufacturer;
    }
  }

  private appendUsersToOrders() {
    for (let order of this.orders) {
      let user = this.users.find((user) => user.id === order.userId);
      order.user = user;
    }
  }

  private appendOrderLinesToOrders() {
    for (let order of this.orders) {
      let orderLines = this.orderLines.filter(
        (orderLine) => orderLine.orderId === order.id
      );
      order.orderLines = orderLines;
    }
  }
}
