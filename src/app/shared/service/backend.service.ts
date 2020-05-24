import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/Order';
import { OrderLine } from '../model/OrderLine';
import { User } from '../model/User';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private httpClient: HttpClient) {}

  async loadOrders(): Promise<Order[]> {
    return await this.httpClient
      .get<Order[]>('http://localhost:8000/orders')
      .toPromise();
  }

  async loadOrder(id: String): Promise<Order> {
    return await this.httpClient
      .get<Order>('http://localhost:8000/orders/' + id)
      .toPromise();
  }

  async loadOrderLines(): Promise<OrderLine[]> {
    return await this.httpClient
      .get<OrderLine[]>('http://localhost:8000/orderLines')
      .toPromise();
  }

  async loadUsers(): Promise<User[]> {
    return await this.httpClient
      .get<User[]>('http://localhost:8000/users')
      .toPromise();
  }

  async loadProducts(): Promise<Product[]> {
    return await this.httpClient
      .get<Product[]>('http://localhost:8000/products')
      .toPromise();
  }
}
