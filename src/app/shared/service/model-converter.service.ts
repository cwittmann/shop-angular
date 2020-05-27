import { Injectable } from '@angular/core';
import { OrderViewModel } from '../model/OrderViewModel';
import { Order } from '../model/Order';
import { OrderLine } from '../model/OrderLine';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class ModelConverterService {
  constructor(private storeService: StoreService, ) {}

  convertOrderViewModelToModels() {
    let order: Order = this.storeService.shoppingCart as Order;
    let orderLines: OrderLine[] = this.storeService.shoppingCart
      .orderLines as OrderLine[];
    console.log(order);
    console.log(orderLines);

  }
}
