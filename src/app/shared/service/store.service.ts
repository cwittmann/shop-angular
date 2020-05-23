import { Injectable } from '@angular/core';
import { Order } from '../model/Order';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  orders: Order[] = [];
  currentOrder: Order = new Order();

  constructor(private backendService: BackendService) {}

  async loadOrders() {
    this.orders = await this.backendService.loadOrders();
  }

  async loadOrder(id: String) {
    this.currentOrder = await this.backendService.loadOrder(id);
  }
}
