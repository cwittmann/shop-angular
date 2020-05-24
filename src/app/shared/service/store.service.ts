import { Injectable } from '@angular/core';
import { Order } from '../model/Order';
import { BackendService } from './backend.service';
import { OrderLine } from '../model/OrderLine';
import { User } from '../model/User';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  orders: Order[] = [];
  orderLines: OrderLine[] = [];
  users: User[] = [];
  products: Product[] = [];
  currentOrder: Order = new Order();

  constructor(private backendService: BackendService) {}

  async loadOrders() {
    this.orders = await this.backendService.loadOrders();
    this.orderLines = await this.backendService.loadOrderLines();
    this.users = await this.backendService.loadUsers();
    this.products = await this.backendService.loadProducts();

    this.appendOrderLines();
    this.appendUsers();
    this.appendProducts();
    this.sortOrders();
  }

  async loadOrder(id: String) {
    this.currentOrder = this.orders.find((order) => order.id === id);
  }

  private appendProducts() {
    for (let orderLine of this.orderLines) {
      let product = this.products.find(
        (product) => product.id === orderLine.productId
      );
      orderLine.productName = product.name;
      orderLine.productDescription = product.description;
      orderLine.totalPrice = orderLine.amount * Number(product.price);
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

  private appendUsers() {
    for (let order of this.orders) {
      let user = this.users.find((user) => user.id === order.userId);
      order.user = user;
    }
  }

  private sortOrders() {
    for (let order of this.orders) {
      let dateTypeless: any = order.date;
      order.date = new Date(
        dateTypeless.year,
        dateTypeless.month,
        dateTypeless.day
      );
    }
    this.orders.sort((order1, order2) => (order1.date > order2.date ? 1 : -1));
  }
}
