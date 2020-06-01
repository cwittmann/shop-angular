import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../enum/OrderStatus';
import { OrderViewModel } from '../model/OrderViewModel';
import { OrderLineViewModel } from '../model/OrderLineViewModel';
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
  orderLines: OrderLineViewModel[] = [];
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

    await this.loadOrders();
    await this.loadUser();
    await this.initializeShoppingCart();

    this.loading = false;

    return true;
  }

  async reload() {
    this.loading = true;
    await this.loadOrders();
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

  private async loadOrders() {
    this.orders = (await this.backendService.loadOrders()) as OrderViewModel[];
    this.rights = (await this.backendService.loadRights()) as Right[];
    this.roles = (await this.backendService.loadRoles()) as Role[];
    this.roleRights = (await this.backendService.loadRoleRights()) as RoleRight[];
    this.users = (await this.backendService.loadUsers()) as User[];
    this.manufacturers = (await this.backendService.loadManufacturers()) as Manufacturer[];
    this.products = (await this.backendService.loadProducts()) as Product[];
    this.orderLines = (await this.backendService.loadOrderLines()) as OrderLineViewModel[];

    this.appendUsers();
    this.appendProducts();
    this.appendOrderLines();
    this.sortOrders();
  }

  private appendUsers() {
    for (let order of this.orders) {
      let user = this.users.find((user) => user.id === order.userId);
      order.user = user;
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
