import { OrderStatus } from '../enum/OrderStatus';
import { OrderLine } from './OrderLine';
import { User } from './User';

export class Order {
  id: string;
  userId: string;
  date: Date;
  status: OrderStatus;
  orderLines: OrderLine[];
  user: User;

  public Order(id: string, userId: string, date: Date, status: OrderStatus) {
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.status = status;
  }
}
