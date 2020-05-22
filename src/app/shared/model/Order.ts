import { OrderStatus } from '../enum/OrderStatus';

export class Order {
  id: string;
  userId: string;
  date: Date;
  status: OrderStatus;

  public Order(id: string, userId: string, date: Date, status: OrderStatus) {
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.status = status;
  }
}
