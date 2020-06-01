import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../enum/OrderStatus';
import { OrderViewModel } from '../model/OrderViewModel';
import { OrderService } from './order.service';
import { User } from '../model/User';
import { Manufacturer } from '../model/Manufacturer';
import { Product } from '../model/Product';
import { Order } from '../model/Order';
import { OrderLine } from '../model/OrderLine';
import { Right } from '../model/Right';
import { RoleRight } from '../model/RoleRight';
import { Role } from '../model/Role';
import { BaseModel } from '../model/BaseModel';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  orders: OrderViewModel[] = [];
  currentOrder: OrderViewModel;
  manufacturers: Manufacturer[] = [];
  products: Product[] = [];
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

  async initialize(): Promise<boolean> {
    this.loading = true;

    await this.loadData();
    await this.loadUser();
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
    this.rights = (await this.backendService.loadRights()) as Right[];
    this.roleRights = (await this.backendService.loadRoleRights()) as RoleRight[];
    this.roles = (await this.backendService.loadRoles()) as Role[];
    this.appendRightsToRoles();

    this.users = (await this.backendService.loadUsers()) as User[];
    this.appendRolesToUsers();

    this.manufacturers = (await this.backendService.loadManufacturers()) as Manufacturer[];
    this.products = (await this.backendService.loadProducts()) as Product[];
    this.appendManufacturersToProducts();

    this.orderLines = (await this.backendService.loadOrderLines()) as OrderLine[];
    this.orders = (await this.backendService.loadOrders()) as OrderViewModel[];
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

  private appendRolesToUsers() {
    for (let user of this.users) {
      let role = this.roles.find((role) => role.id === user.roleId);
      user.role = role;
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
