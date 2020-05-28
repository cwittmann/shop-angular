import { Injectable, EventEmitter } from '@angular/core';
import { Order } from '../model/Order';
import { OrderLine } from '../model/OrderLine';
import { BackendService } from './backend.service';
import { OrderViewModel } from '../model/OrderViewModel';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  savedSuccessfully: EventEmitter<Boolean>;

  constructor(private backendService: BackendService) {
    this.savedSuccessfully = new EventEmitter<Boolean>();
  }

  postOrder(orderViewModel: OrderViewModel) {
    try {
      let order: Order = orderViewModel as Order;
      this.backendService.postOrder(order);

      let orderLines: OrderLine[] = orderViewModel.orderLines as OrderLine[];

      for (let orderLine of orderLines) {
        this.backendService.postOrderLine(orderLine);
      }

      this.savedSuccessfully.emit(true);
    } catch (exception) {
      console.log('Could not save order:' + exception);
    }
  }

  putOrder(orderViewModel: OrderViewModel) {
    try {
      let order: Order = orderViewModel as Order;
      this.backendService.putOrder(order);

      let orderLines: OrderLine[] = orderViewModel.orderLines as OrderLine[];

      for (let orderLine of orderLines) {
        this.backendService.putOrderLine(orderLine);
      }

      this.savedSuccessfully.emit(true);
    } catch (exception) {
      console.log('Could not save order:' + exception);
    }
  }

  deleteOrder(orderViewModel: OrderViewModel) {
    try {
      let order: Order = orderViewModel as Order;
      this.backendService.deleteOrder(order.id);

      let orderLines: OrderLine[] = orderViewModel.orderLines as OrderLine[];

      for (let orderLine of orderLines) {
        this.backendService.deleteOrderLine(orderLine.id);
      }

      this.savedSuccessfully.emit(true);
    } catch (exception) {
      console.log('Could not save order:' + exception);
    }
  }
}
