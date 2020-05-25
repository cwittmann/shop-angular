import { Injectable } from '@angular/core';
import { Order } from '../model/Order';
import { BackendService } from './backend.service';
import { OrderLine } from '../model/OrderLine';
import { User } from '../model/User';
import { Product } from '../model/Product';
import { Manufacturer } from '../model/Manufacturer';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  orders: Order[] = [];
  currentOrder: Order = new Order();
  manufacturers: Manufacturer[] = [];
  products: Product[] = [];
  orderLines: OrderLine[] = [];
  users: User[] = [];

  shoppingCart: Product[] = [];

  constructor(private backendService: BackendService) {}

  async loadOrders() {
    this.orders = await this.backendService.loadOrders();
    this.users = await this.backendService.loadUsers();
    this.manufacturers = await this.backendService.loadManufacturers();
    this.products = await this.backendService.loadProducts();
    this.orderLines = await this.backendService.loadOrderLines();

    this.appendUsers();
    this.appendManufacturers();
    this.appendProducts();
    this.appendOrderLines();
    this.sortOrders();
  }

  async loadOrder(id: string) {
    this.currentOrder = this.orders.find((order) => order.id === id);
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
      product.manufacturerName = manufacturer.name;
    }
  }

  private appendProducts() {
    for (let orderLine of this.orderLines) {
      let product = this.products.find(
        (product) => product.id === orderLine.productId
      );
      orderLine.manufacturerName = product.manufacturerName;
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
