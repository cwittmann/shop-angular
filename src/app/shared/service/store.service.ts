import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../enum/OrderStatus';
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

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  orders: OrderViewModel[] = [];
  currentOrder: OrderViewModel;
  manufacturers: Manufacturer[] = [];
  products: Product[] = [];
  categories: Category[] = [];
  orderLines: OrderLine[] = [];
  users: User[] = [];
  roles: Role[] = [];
  rights: Right[] = [];
  roleRights: RoleRight[] = [];
  currentUser: User;

  shoppingCart: OrderViewModel;

  loading: boolean = false;

  constructor(
    private backendService: BackendService,
    private orderService: OrderService
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
    this.shoppingCart.clear(this.currentUser);
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

    this.manufacturers = (await this.backendService.get<Manufacturer[]>(
      'manufacturers'
    )) as Manufacturer[];
    this.categories = (await this.backendService.get<Category[]>(
      'categories'
    )) as Manufacturer[];
    this.products = (await this.backendService.get<Product[]>(
      'products'
    )) as Product[];
    this.appendCategoriesToProducts();
    this.appendManufacturersToProducts();

    this.orderLines = (await this.backendService.get<OrderLine[]>(
      'orderLines'
    )) as OrderLine[];
    this.orders = (await this.backendService.get<Order[]>(
      'orders'
    )) as OrderViewModel[];
    this.appendOrderLinesToOrders();

    this.appendUsersToOrders();
    this.sortOrders();
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

  private sortOrders() {
    this.orders.sort((order1, order2) => (order1.date < order2.date ? 1 : -1));
  }
}
