import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/Order';
import { OrderLine } from '../model/OrderLine';
import { User } from '../model/User';
import { Product } from '../model/Product';
import { Manufacturer } from '../model/Manufacturer';
import { Right } from '../model/Right';
import { RoleRight } from '../model/RoleRight';
import { Role } from '../model/Role';
import { BaseModel } from '../model/BaseModel';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private httpClient: HttpClient) {}

  // GENERIC

  async post<T>(item: T, dbName: string): Promise<T> {
    return await this.httpClient
      .post<T>('http://localhost:8000/' + dbName, item)
      .toPromise();
  }

  async put<T extends BaseModel>(item: T, dbName: string): Promise<T> {
    return await this.httpClient
      .put<T>('http://localhost:8000/' + dbName + '/' + item.id, item)
      .toPromise();
  }

  async delete<T>(id: string, dbName: string) {
    return await this.httpClient
      .delete<T>('http://localhost:8000/' + dbName + '/' + id)
      .toPromise();
  }

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

  // ROLES

  async loadRoles(): Promise<Role[]> {
    return await this.httpClient
      .get<Role[]>('http://localhost:8000/roles')
      .toPromise();
  }

  async loadRole(id: string): Promise<Role> {
    return await this.httpClient
      .get<Role>('http://localhost:8000/roles/' + id)
      .toPromise();
  }

  async postRole(role: Role): Promise<Role> {
    return await this.httpClient
      .post<Role>('http://localhost:8000/roles', role)
      .toPromise();
  }

  async putRole(role: Role): Promise<Role> {
    return await this.httpClient
      .put<Role>('http://localhost:8000/roles/' + role.id, role)
      .toPromise();
  }

  async deleteRole(id: string) {
    return await this.httpClient
      .delete<Role>('http://localhost:8000/roles/' + id)
      .toPromise();
  }

  // ROLE RIGHTS

  async loadRoleRights(): Promise<RoleRight[]> {
    return await this.httpClient
      .get<RoleRight[]>('http://localhost:8000/roleRights')
      .toPromise();
  }

  async loadRoleRight(id: string): Promise<RoleRight> {
    return await this.httpClient
      .get<RoleRight>('http://localhost:8000/roleRights/' + id)
      .toPromise();
  }

  async postRoleRight(roleRight: RoleRight): Promise<RoleRight> {
    return await this.httpClient
      .post<RoleRight>('http://localhost:8000/roleRights', roleRight)
      .toPromise();
  }

  async putRoleRight(roleRight: RoleRight): Promise<RoleRight> {
    return await this.httpClient
      .put<RoleRight>(
        'http://localhost:8000/roleRights/' + roleRight.id,
        roleRight
      )
      .toPromise();
  }

  async deleteRoleRight(id: string) {
    return await this.httpClient
      .delete<RoleRight>('http://localhost:8000/roleRights/' + id)
      .toPromise();
  }
}
