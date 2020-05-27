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

  constructor(private backendService: BackendService) {}

  async initialize() {
    await this.loadUser();
    await this.initializeShoppingCart();
    this.loadOrders();
  }

  private async loadUser() {
    this.currentUser = await this.backendService.loadUser(
      'ef0307a9-2b68-4ff4-ad73-056518297e18'
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
    this.orders.sort((order1, order2) => (order1.date > order2.date ? 1 : -1));
  }
}
