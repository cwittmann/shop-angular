import { OrderStatus } from '../enum/OrderStatus';
import { User } from './User';
import { v4 as uuidv4 } from 'uuid';
import { Order } from './Order';
import { OrderLine } from './OrderLine';

export class OrderViewModel extends Order {
  orderLines: OrderLine[];
  user: User;

  constructor(
    id: string,
    date: Date,
    status: OrderStatus,
    orderLines: OrderLine[],
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
