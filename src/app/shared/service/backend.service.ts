import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/Order';

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
}
