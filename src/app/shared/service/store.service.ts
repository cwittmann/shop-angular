import { Injectable } from '@angular/core';
import { Order } from '../model/Order';
import { BackendService } from './backend.service';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../enum/OrderStatus';
import { OrderViewModel } from '../model/OrderViewModel';
import { ManufacturerViewModel } from '../model/ManufacturerViewModel';
import { ProductViewModel } from '../model/ProductViewModel';
import { OrderLineViewModel } from '../model/OrderLineViewModel';
import { UserViewModel } from '../model/UserViewModel';

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

  constructor(private backendService: BackendService) {}

  async initialize() {
    await this.loadUser();
    await this.initializeShoppingCart();
    this.loadOrders();
  }

  private async loadUser() {
    this.currentUser = await this.backendService.loadUser(
      '9b4fb2f7-5b02-425a-8818-181d3488a25e'
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

  async loadOrder(id: string) {
    this.currentOrder = await this.orders.find((order) => order.id === id);
    this.currentOrder.calculatePrices();
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
