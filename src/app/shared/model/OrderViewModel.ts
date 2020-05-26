import { OrderStatus } from '../enum/OrderStatus';
import { User } from './User';
import { OrderLineViewModel } from './OrderLineViewModel';

export class OrderViewModel {
  id: string;
  userId: string;
  date: Date;
  status: OrderStatus;

  orderLines: OrderLineViewModel[];
  user: User;

  constructor(
    id: string,
    date: Date,
    status: OrderStatus,
    orderLines: OrderLineViewModel[],
    user: User
  ) {
    this.id = id;
    this.userId = user.id;
    this.date = date;
    this.status = status;
    this.orderLines = orderLines;
    this.user = user;
  }

  public calculatePrices() {
    for (let orderLine of this.orderLines) {
      orderLine.calculatePrice();
    }
  }
}
