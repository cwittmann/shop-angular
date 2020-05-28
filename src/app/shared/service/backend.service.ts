import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/Order';
import { OrderLine } from '../model/OrderLine';
import { User } from '../model/User';
import { Product } from '../model/Product';
import { Manufacturer } from '../model/Manufacturer';
import { Right } from '../model/Right';
import { UserRight } from '../model/UserRight';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private httpClient: HttpClient) {}

  // ORDERS

  async loadOrders(): Promise<Order[]> {
    return await this.httpClient
      .get<Order[]>('http://localhost:8000/orders')
      .toPromise();
  }

  async postOrder(order: Order): Promise<Order> {
    return await this.httpClient
      .post<Order>('http://localhost:8000/orders', order)
      .toPromise();
  }

  async putOrder(order: Order): Promise<Order> {
    return await this.httpClient
      .put<Order>('http://localhost:8000/orders/' + order.id, order)
      .toPromise();
  }

  async deleteOrder(id: string) {
    return await this.httpClient
      .delete<Order>('http://localhost:8000/orders/' + id)
      .toPromise();
  }

  // ORDER LINES

  async loadOrderLines(): Promise<OrderLine[]> {
    return await this.httpClient
      .get<OrderLine[]>('http://localhost:8000/orderLines')
      .toPromise();
  }

  async postOrderLine(orderLine: OrderLine) {
    await this.httpClient
      .post<OrderLine>('http://localhost:8000/orderLines', orderLine)
      .toPromise();
  }

  async putOrderLine(orderLine: OrderLine): Promise<OrderLine> {
    return await this.httpClient
      .put<OrderLine>(
        'http://localhost:8000/orderLines/' + orderLine.id,
        orderLine
      )
      .toPromise();
  }

  async deleteOrderLine(id: string) {
    return await this.httpClient
      .delete<OrderLine>('http://localhost:8000/orderLines/' + id)
      .toPromise();
  }

  // PRODUCTS

  async loadProducts(): Promise<Product[]> {
    return await this.httpClient
      .get<Product[]>('http://localhost:8000/products')
      .toPromise();
  }

  async postProduct(product: Product): Promise<Product> {
    return await this.httpClient
      .post<Product>('http://localhost:8000/products', product)
      .toPromise();
  }

  async putProduct(product: Product): Promise<Product> {
    return await this.httpClient
      .put<Product>('http://localhost:8000/products/' + product.id, product)
      .toPromise();
  }

  async deleteProduct(id: string) {
    return await this.httpClient
      .delete<Product>('http://localhost:8000/products/' + id)
      .toPromise();
  }

  // MANUFACTURERS

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

  // USERS

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

  async postUser(user: User): Promise<User> {
    return await this.httpClient
      .post<User>('http://localhost:8000/users', user)
      .toPromise();
  }

  async putUser(user: User): Promise<User> {
    return await this.httpClient
      .put<User>('http://localhost:8000/users/' + user.id, user)
      .toPromise();
  }

  async deleteUser(id: string) {
    return await this.httpClient
      .delete<User>('http://localhost:8000/users/' + id)
      .toPromise();
  }

  // RIGHTS

  async loadRights(): Promise<Right[]> {
    return await this.httpClient
      .get<Right[]>('http://localhost:8000/rights')
      .toPromise();
  }

  async loadRight(id: string): Promise<Right> {
    return await this.httpClient
      .get<Right>('http://localhost:8000/rights/' + id)
      .toPromise();
  }

  async postRight(right: Right): Promise<Right> {
    return await this.httpClient
      .post<Right>('http://localhost:8000/rights', right)
      .toPromise();
  }

  async putRight(right: Right): Promise<Right> {
    return await this.httpClient
      .put<Right>('http://localhost:8000/rights/' + right.id, right)
      .toPromise();
  }

  async deleteRight(id: string) {
    return await this.httpClient
      .delete<Right>('http://localhost:8000/rights/' + id)
      .toPromise();
  }

  // USER RIGHTS

  async loadUserRights(): Promise<UserRight[]> {
    return await this.httpClient
      .get<UserRight[]>('http://localhost:8000/userRights')
      .toPromise();
  }

  async loadUserRight(id: string): Promise<UserRight> {
    return await this.httpClient
      .get<UserRight>('http://localhost:8000/userRights/' + id)
      .toPromise();
  }

  async postUserRight(userRight: UserRight): Promise<UserRight> {
    return await this.httpClient
      .post<UserRight>('http://localhost:8000/userRights', userRight)
      .toPromise();
  }

  async putUserRight(userRight: UserRight): Promise<UserRight> {
    return await this.httpClient
      .put<UserRight>(
        'http://localhost:8000/userRights/' + userRight.id,
        userRight
      )
      .toPromise();
  }

  async deleteUserRight(id: string) {
    return await this.httpClient
      .delete<UserRight>('http://localhost:8000/userRights/' + id)
      .toPromise();
  }
}
