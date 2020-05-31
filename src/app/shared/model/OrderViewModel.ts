import { OrderStatus } from '../enum/OrderStatus';
import { User } from './User';
import { OrderLineViewModel } from './OrderLineViewModel';
import { v4 as uuidv4 } from 'uuid';
import { Order } from './Order';

export class OrderViewModel extends Order {
  orderLines: OrderLineViewModel[];
  user: User;

  constructor(
    id: string,
    date: Date,
    status: OrderStatus,
    orderLines: OrderLineViewModel[],
    user: User
  ) {
    super(id, user.id, date, status);
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
