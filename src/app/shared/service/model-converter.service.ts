import { Injectable, EventEmitter } from '@angular/core';
import { Order } from '../model/Order';
import { OrderLine } from '../model/OrderLine';
import { BackendService } from './backend.service';
import { OrderViewModel } from '../model/OrderViewModel';

@Injectable({
  providedIn: 'root',
})
export class ModelConverterService {
  savedSuccessfully: EventEmitter<Boolean>;

  constructor(private backendService: BackendService) {
    this.savedSuccessfully = new EventEmitter<Boolean>();
  }

  convertAndSave(shoppingCart: OrderViewModel) {
    try {
      let order: Order = shoppingCart as Order;
      this.backendService.saveOrder(order);

      let orderLines: OrderLine[] = shoppingCart.orderLines as OrderLine[];

      for (let orderLine of orderLines) {
        this.backendService.saveOrderLine(orderLine);
      }

      this.savedSuccessfully.emit(true);
    } catch (exception) {
      console.log('Could not save order:' + exception);
    }
  }
}
