import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/Order';
import { OrderLine } from '../model/OrderLine';
import { User } from '../model/User';
import { Product } from '../model/Product';
import { Manufacturer } from '../model/Manufacturer';

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

  async saveOrder(order: Order): Promise<Order> {
    return await this.httpClient
      .post<Order>('http://localhost:8000/orders', order)
      .toPromise();
  }

  async loadOrderLines(): Promise<OrderLine[]> {
    return await this.httpClient
      .get<OrderLine[]>('http://localhost:8000/orderLines')
      .toPromise();
  }

  async saveOrderLine(orderLine: OrderLine) {
    await this.httpClient
      .post<OrderLine>('http://localhost:8000/orderLines', orderLine)
      .toPromise();
  }

  async loadUsers(): Promise<User[]> {
    return await this.httpClient
      .get<User[]>('http://localhost:8000/users')
      .toPromise();
  }

  async loadUser(id: string): Promise<User> {
    return await this.httpClient
      .get<User>('http://localhost:8000/users/' + id)
      .toPromise();
  }

  async loadProducts(): Promise<Product[]> {
    return await this.httpClient
      .get<Product[]>('http://localhost:8000/products')
      .toPromise();
  }

  async loadManufacturers(): Promise<Manufacturer[]> {
    return await this.httpClient
      .get<Manufacturer[]>('http://localhost:8000/manufacturers')
      .toPromise();
  }

  async postManufacturer(manufacturer: Manufacturer): Promise<Manufacturer> {
    return await this.httpClient
      .post<Manufacturer>('http://localhost:8000/manufacturers', manufacturer)
      .toPromise();
  }

  async putManufacturer(manufacturer: Manufacturer): Promise<Manufacturer> {
    return await this.httpClient
      .put<Manufacturer>(
        'http://localhost:8000/manufacturers/' + manufacturer.id,
        manufacturer
      )
      .toPromise();
  }

  async deleteManufacturer(id: string) {
    return await this.httpClient
      .delete<Manufacturer>('http://localhost:8000/manufacturers/' + id)
      .toPromise();
  }
}
