import { Injectable } from '@angular/core';
import { Order } from '../model/Order';
import { OrderLine } from '../model/OrderLine';
import { StoreService } from './store.service';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class ModelConverterService {
  constructor(
    private storeService: StoreService,
    private backendService: BackendService
  ) {}

  convertOrderViewModelToModels() {
    let order: Order = this.storeService.shoppingCart as Order;
    this.backendService.saveOrder(order);

    let orderLines: OrderLine[] = this.storeService.shoppingCart
      .orderLines as OrderLine[];

    for (let orderLine of orderLines) {
      this.backendService.saveOrderLine(orderLine);
    }
  }
}
