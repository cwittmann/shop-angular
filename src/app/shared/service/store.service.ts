import { Injectable } from '@angular/core';
import { Order } from '../model/Order';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  orders: Order[] = [];

  constructor(private backendService: BackendService) {}

  async loadOrders() {
    this.orders = await this.backendService.loadOrders();
  }
}
