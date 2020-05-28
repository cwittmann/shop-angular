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
  currentUser: UserViewModel;

  shoppingCart: OrderViewModel;

  constructor(
    private backendService: BackendService,
    private orderService: OrderService
  ) {}

  async initialize() {
    await this.loadOrders();
    await this.loadUser();
    this.initializeShoppingCart();
  }

  async reload() {
    await this.loadOrders();
    this.initializeShoppingCart();
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

  async postManufacturer(manufacturer: Manufacturer) {
    await this.backendService.postManufacturer(manufacturer);
  }

  async putManufacturer(manufacturer: Manufacturer) {
    await this.backendService.putManufacturer(manufacturer);
  }

  async deleteManufacturer(id: string) {
    await this.backendService.deleteManufacturer(id);
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
    this.users = (await this.backendService.loadUsers()) as UserViewModel[];
    this.manufacturers = (await this.backendService.loadManufacturers()) as ManufacturerViewModel[];
    this.products = (await this.backendService.loadProducts()) as ProductViewModel[];
    this.orderLines = (await this.backendService.loadOrderLines()) as OrderLineViewModel[];

    this.appendUsers();
    this.appendManufacturers();
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
