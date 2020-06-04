import { OrderStatus } from '../enum/OrderStatus';
import { BaseModel } from './BaseModel';

export class Order extends BaseModel {
  public static dbNameSingular = 'order';
  public static dbNamePlural = 'orders';
  public id: string;
  public userId: string;
  public date: Date;
  public status: OrderStatus;

  constructor(id: string, userId: string, date: Date, status: OrderStatus) {
    super(id);
    this.userId = userId;
    this.date = date;
    this.status = status;
  }
}
