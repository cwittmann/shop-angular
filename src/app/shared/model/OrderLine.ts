import { BaseModel } from './BaseModel';

export class OrderLine extends BaseModel {
  public static dbName = 'orderLines';
  public id: string;
  public orderId: string;
  public productId: string;
  public amount: number;

  constructor(id: string, orderId: string, productId: string, amount: number) {
    super(id);
    this.orderId = orderId;
    this.productId = productId;
    this.amount = amount;
  }
}
