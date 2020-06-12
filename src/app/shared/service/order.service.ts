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
      this.backendService.post<Order>(order, 'orders');

      let orderLines: OrderLine[] = orderViewModel.orderLines as OrderLine[];

      for (let orderLine of orderLines) {
        this.backendService.post<OrderLine>(orderLine, 'orderLines');
      }

      this.savedSuccessfully.emit(true);
    } catch (exception) {
      console.log('Could not save order:' + exception);
    }
  }

  putOrder(orderViewModel: OrderViewModel) {
    try {
      let order: Order = orderViewModel as Order;
      this.backendService.put<Order>(order, 'orders');

      let orderLines: OrderLine[] = orderViewModel.orderLines as OrderLine[];

      for (let orderLine of orderLines) {
        this.backendService.put<OrderLine>(orderLine, 'orderLines');
      }

      this.savedSuccessfully.emit(true);
    } catch (exception) {
      console.log('Could not save order:' + exception);
    }
  }

  deleteOrder(orderViewModel: OrderViewModel) {
    try {
      let order: Order = orderViewModel as Order;
      this.backendService.delete<Order>(order.id, 'orders');
      this.savedSuccessfully.emit(true);
    } catch (exception) {
      console.log('Could not save order:' + exception);
    }
  }
}
