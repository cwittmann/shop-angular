import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../enum/OrderStatus';
import { OrderViewModel } from '../model/OrderViewModel';
import { ManufacturerViewModel } from '../model/ManufacturerViewModel';
import { ProductViewModel } from '../model/ProductViewModel';
import { OrderLineViewModel } from '../model/OrderLineViewModel';
import { UserViewModel } from '../model/UserViewModel';
import { OrderService } from './order.service';
import { Manufacturer } from '../model/Manufacturer';
import { User } from '../model/User';
import { Product } from '../model/Product';
import { Order } from '../model/Order';
import { OrderLine } from '../model/OrderLine';
import { Right } from '../model/Right';
import { RightViewModel } from '../model/RightViewModel';
import { RoleRightViewModel } from '../model/RoleRightViewModel';
import { RoleRight } from '../model/RoleRight';
import { RoleViewModel } from '../model/RoleViewModel';
import { Role } from '../model/Role';
import { BaseModel } from '../model/BaseModel';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  orders: OrderViewModel[] = [];
  currentOrder: OrderViewModel;
  manufacturers: ManufacturerViewModel[] = [];
  products: ProductViewModel[] = [];
  orderLines: OrderLineViewModel[] = [];
  users: UserViewModel[] = [];
  roles: RoleViewModel[] = [];
  rights: RightViewModel[] = [];
  roleRights: RoleRightViewModel[] = [];
  currentUser: UserViewModel;

  shoppingCart: OrderViewModel;

  constructor(
    private backendService: BackendService,
    private orderService: OrderService
  ) {}

  async initialize(): Promise<boolean> {
    await this.loadOrders();
    await this.loadUser();
    await this.initializeShoppingCart();

    return true;
  }

  async reload() {
    await this.loadOrders();
    this.initializeShoppingCart();
  }

  async reloadItems(dbName: string) {
    switch (dbName) {
      case 'manufacturers':
        this.manufacturers = (await this.backendService.loadManufacturers()) as ManufacturerViewModel[];
        break;
    }

    this.initializeShoppingCart();
  }

  post<T>(item: T, dbName: string) {
    this.backendService.post<T>(item, dbName);
  }

  put<T extends BaseModel>(item: T, dbName: string) {
    this.backendService.put<T>(item, dbName);
  }

  delete<T>(id: string, dbName: string) {
    this.backendService.delete<T>(id, dbName);
  }

  loadUser() {
    let numberOfUsers = this.users.length;
    let randomNumber = Math.floor(Math.random() * Math.floor(numberOfUsers));
    this.currentUser = this.users[randomNumber];
  }

  async loadOrder(id: string) {
    let loadedOrder = await this.orders.find((order) => order.id === id);

    let currentOrderLines: OrderLineViewModel[] = [];

    for (let orderLine of loadedOrder.orderLines) {
      let currentOrderLine = new OrderLineViewModel(
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
  }

  async postOrderViewModel() {
    await this.orderService.postOrder(this.shoppingCart);
    this.shoppingCart.clear(this.currentUser);
  }

  async putOrderViewModel(order: OrderViewModel) {
    await this.orderService.putOrder(order);
  }

  async putOrder(order: Order) {
    await this.backendService.putOrder(order);
  }

  async deleteOrderViewModel(order: OrderViewModel) {
    await this.orderService.deleteOrder(order);
  }
  async deleteOrder(id: string) {
    await this.backendService.deleteOrder(id);
  }

  async postOrderLine(orderLine: OrderLine) {
    await this.backendService.postOrderLine(orderLine);
  }

  async putOrderLine(orderLine: OrderLine) {
    await this.backendService.putOrderLine(orderLine);
  }

  async deleteOrderLine(id: string) {
    await this.backendService.deleteOrderLine(id);
  }

  async postProduct(product: Product) {
    await this.backendService.postProduct(product);
  }

  async putProduct(product: Product) {
    await this.backendService.putProduct(product);
  }

  async deleteProduct(id: string) {
    await this.backendService.deleteProduct(id);
  }

  async postUser(user: User) {
    await this.backendService.postUser(user);
  }

  async putUser(user: User) {
    await this.backendService.putUser(user);
  }

  async deleteUser(id: string) {
    await this.backendService.deleteUser(id);
  }

  async postRight(right: Right) {
    await this.backendService.postRight(right);
  }

  async putRight(right: Right) {
    await this.backendService.putRight(right);
  }

  async deleteRight(id: string) {
    await this.backendService.deleteRight(id);
  }

  async postRole(role: Role) {
    await this.backendService.postRole(role);
  }

  async putRole(role: Role) {
    await this.backendService.putRole(role);
  }

  async deleteRole(id: string) {
    await this.backendService.deleteRole(id);
  }

  async postRoleRight(roleRight: RoleRight) {
    await this.backendService.postRoleRight(roleRight);
  }

  async putRoleRight(roleRight: RoleRight) {
    await this.backendService.putRoleRight(roleRight);
  }

  async deleteRoleRight(id: string) {
    await this.backendService.deleteRoleRight(id);
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

  private async loadOrders() {
    this.orders = (await this.backendService.loadOrders()) as OrderViewModel[];
    this.rights = (await this.backendService.loadRights()) as RightViewModel[];
    this.roles = (await this.backendService.loadRoles()) as RoleViewModel[];
    this.roleRights = (await this.backendService.loadRoleRights()) as RoleRightViewModel[];
    this.users = (await this.backendService.loadUsers()) as UserViewModel[];
    this.manufacturers = (await this.backendService.loadManufacturers()) as ManufacturerViewModel[];
    this.products = (await this.backendService.loadProducts()) as ProductViewModel[];
    this.orderLines = (await this.backendService.loadOrderLines()) as OrderLineViewModel[];

    this.appendRoleRights();
    this.appendRoles();
    this.appendUsers();
    this.appendManufacturers();
    this.appendProducts();
    this.appendOrderLines();
    this.sortOrders();
  }

  private appendRoleRights() {
    for (let roleRight of this.roleRights) {
      let role = this.roles.find((role) => role.id === roleRight.roleId);
      let right = this.rights.find((right) => right.id === roleRight.rightId);

      if (!role.rights) {
        role.rights = [];
      }

      role.rights.push(right);
    }
  }

  private appendRoles() {
    for (let user of this.users) {
      let role = this.roles.find((role) => role.id === user.roleId);
      user.role = role;
    }
  }

  private appendUsers() {
    for (let order of this.orders) {
      let user = this.users.find((user) => user.id === order.userId);
      order.user = user;
    }
  }

  private appendManufacturers() {
    for (let product of this.products) {
      let manufacturer = this.manufacturers.find(
        (manufacturer) => manufacturer.id === product.manufacturerId
      );
      product.manufacturer = manufacturer;
    }
  }

  private appendProducts() {
    for (let orderLine of this.orderLines) {
      let product = this.products.find(
        (product) => product.id === orderLine.productId
      );
      orderLine.product = product;
    }
  }

  private appendOrderLines() {
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
