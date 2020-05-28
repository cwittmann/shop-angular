import { OrderStatus } from '../enum/OrderStatus';
import { User } from './User';
import { OrderLineViewModel } from './OrderLineViewModel';
import { v4 as uuidv4 } from 'uuid';

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

  public clear(currentUser: User) {
    this.id = uuidv4();
    this.date = new Date();
    this.status = OrderStatus.Created;
    this.orderLines = [];
    this.user = currentUser;
  }

  public calculatePrices() {
    for (let orderLine of this.orderLines) {
      orderLine.calculatePrice();
    }
  }
}
