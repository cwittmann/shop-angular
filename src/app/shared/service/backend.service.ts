import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  headers: HttpHeaders;
  userAuthenticated: EventEmitter<Boolean>;

  constructor(private httpClient: HttpClient) {
    this.userAuthenticated = new EventEmitter();
  }

  // AUTHENTICATION

  authenticate(user: string, password: string) {
    this.headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(user + ':' + password),
    });

    this.httpClient
      .get('http://localhost:8000/auth', {
        headers: this.headers,
        responseType: 'text',
      })
      .subscribe((res) => {
        if (res === 'Successful') {
          this.userAuthenticated.emit(true);
        }
      });
  }

  // GENERIC

  async post<T>(item: T, dbName: string): Promise<T> {
    return await this.httpClient
      .post<T>('http://localhost:8000/' + dbName, item, {
        headers: this.headers,
      })
      .toPromise();
  }

  async put<T extends BaseModel>(item: T, dbName: string): Promise<T> {
    return await this.httpClient
      .put<T>('http://localhost:8000/' + dbName + '/' + item.id, item, {
        headers: this.headers,
      })
      .toPromise();
  }

  async delete<T>(id: string, dbName: string) {
    return await this.httpClient
      .delete<T>('http://localhost:8000/' + dbName + '/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }

  // ORDERS

  async loadOrders(): Promise<Order[]> {
    return await this.httpClient
      .get<Order[]>('http://localhost:8000/orders', { headers: this.headers })
      .toPromise();
  }

  async postOrder(order: Order): Promise<Order> {
    return await this.httpClient
      .post<Order>('http://localhost:8000/orders', order, {
        headers: this.headers,
      })
      .toPromise();
  }

  async putOrder(order: Order): Promise<Order> {
    return await this.httpClient
      .put<Order>('http://localhost:8000/orders/' + order.id, order, {
        headers: this.headers,
      })
      .toPromise();
  }

  async deleteOrder(id: string) {
    return await this.httpClient
      .delete<Order>('http://localhost:8000/orders/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }

  // ORDER LINES

  async loadOrderLines(): Promise<OrderLine[]> {
    return await this.httpClient
      .get<OrderLine[]>('http://localhost:8000/orderLines', {
        headers: this.headers,
      })
      .toPromise();
  }

  async postOrderLine(orderLine: OrderLine) {
    await this.httpClient
      .post<OrderLine>('http://localhost:8000/orderLines', orderLine, {
        headers: this.headers,
      })
      .toPromise();
  }

  async putOrderLine(orderLine: OrderLine): Promise<OrderLine> {
    return await this.httpClient
      .put<OrderLine>(
        'http://localhost:8000/orderLines/' + orderLine.id,
        orderLine,
        { headers: this.headers }
      )
      .toPromise();
  }

  async deleteOrderLine(id: string) {
    return await this.httpClient
      .delete<OrderLine>('http://localhost:8000/orderLines/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }

  // PRODUCTS

  async loadProducts(): Promise<Product[]> {
    return await this.httpClient
      .get<Product[]>('http://localhost:8000/products', {
        headers: this.headers,
      })
      .toPromise();
  }

  async postProduct(product: Product): Promise<Product> {
    return await this.httpClient
      .post<Product>('http://localhost:8000/products', product, {
        headers: this.headers,
      })
      .toPromise();
  }

  async putProduct(product: Product): Promise<Product> {
    return await this.httpClient
      .put<Product>('http://localhost:8000/products/' + product.id, product, {
        headers: this.headers,
      })
      .toPromise();
  }

  async deleteProduct(id: string) {
    return await this.httpClient
      .delete<Product>('http://localhost:8000/products/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }

  // MANUFACTURERS

  async loadManufacturers(): Promise<Manufacturer[]> {
    return await this.httpClient
      .get<Manufacturer[]>('http://localhost:8000/manufacturers', {
        headers: this.headers,
      })
      .toPromise();
  }

  async postManufacturer(manufacturer: Manufacturer): Promise<Manufacturer> {
    return await this.httpClient
      .post<Manufacturer>('http://localhost:8000/manufacturers', manufacturer, {
        headers: this.headers,
      })
      .toPromise();
  }

  async putManufacturer(manufacturer: Manufacturer): Promise<Manufacturer> {
    return await this.httpClient
      .put<Manufacturer>(
        'http://localhost:8000/manufacturers/' + manufacturer.id,
        manufacturer,
        { headers: this.headers }
      )
      .toPromise();
  }

  async deleteManufacturer(id: string) {
    return await this.httpClient
      .delete<Manufacturer>('http://localhost:8000/manufacturers/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }

  // USERS

  async loadUsers(): Promise<User[]> {
    return await this.httpClient
      .get<User[]>('http://localhost:8000/users', { headers: this.headers })
      .toPromise();
  }

  async loadUser(id: string): Promise<User> {
    return await this.httpClient
      .get<User>('http://localhost:8000/users/' + id, { headers: this.headers })
      .toPromise();
  }

  async postUser(user: User): Promise<User> {
    return await this.httpClient
      .post<User>('http://localhost:8000/users', user, {
        headers: this.headers,
      })
      .toPromise();
  }

  async putUser(user: User): Promise<User> {
    return await this.httpClient
      .put<User>('http://localhost:8000/users/' + user.id, user, {
        headers: this.headers,
      })
      .toPromise();
  }

  async deleteUser(id: string) {
    return await this.httpClient
      .delete<User>('http://localhost:8000/users/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }

  // RIGHTS

  async loadRights(): Promise<Right[]> {
    return await this.httpClient
      .get<Right[]>('http://localhost:8000/rights', { headers: this.headers })
      .toPromise();
  }

  async loadRight(id: string): Promise<Right> {
    return await this.httpClient
      .get<Right>('http://localhost:8000/rights/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }

  async postRight(right: Right): Promise<Right> {
    return await this.httpClient
      .post<Right>('http://localhost:8000/rights', right, {
        headers: this.headers,
      })
      .toPromise();
  }

  async putRight(right: Right): Promise<Right> {
    return await this.httpClient
      .put<Right>('http://localhost:8000/rights/' + right.id, right, {
        headers: this.headers,
      })
      .toPromise();
  }

  async deleteRight(id: string) {
    return await this.httpClient
      .delete<Right>('http://localhost:8000/rights/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }

  // ROLES

  async loadRoles(): Promise<Role[]> {
    return await this.httpClient
      .get<Role[]>('http://localhost:8000/roles', { headers: this.headers })
      .toPromise();
  }

  async loadRole(id: string): Promise<Role> {
    return await this.httpClient
      .get<Role>('http://localhost:8000/roles/' + id, { headers: this.headers })
      .toPromise();
  }

  async postRole(role: Role): Promise<Role> {
    return await this.httpClient
      .post<Role>('http://localhost:8000/roles', role, {
        headers: this.headers,
      })
      .toPromise();
  }

  async putRole(role: Role): Promise<Role> {
    return await this.httpClient
      .put<Role>('http://localhost:8000/roles/' + role.id, role, {
        headers: this.headers,
      })
      .toPromise();
  }

  async deleteRole(id: string) {
    return await this.httpClient
      .delete<Role>('http://localhost:8000/roles/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }

  // ROLE RIGHTS

  async loadRoleRights(): Promise<RoleRight[]> {
    return await this.httpClient
      .get<RoleRight[]>('http://localhost:8000/roleRights', {
        headers: this.headers,
      })
      .toPromise();
  }

  async loadRoleRight(id: string): Promise<RoleRight> {
    return await this.httpClient
      .get<RoleRight>('http://localhost:8000/roleRights/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }

  async postRoleRight(roleRight: RoleRight): Promise<RoleRight> {
    return await this.httpClient
      .post<RoleRight>('http://localhost:8000/roleRights', roleRight, {
        headers: this.headers,
      })
      .toPromise();
  }

  async putRoleRight(roleRight: RoleRight): Promise<RoleRight> {
    return await this.httpClient
      .put<RoleRight>(
        'http://localhost:8000/roleRights/' + roleRight.id,
        roleRight,
        { headers: this.headers }
      )
      .toPromise();
  }

  async deleteRoleRight(id: string) {
    return await this.httpClient
      .delete<RoleRight>('http://localhost:8000/roleRights/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }
}
