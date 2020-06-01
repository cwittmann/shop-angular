import { BaseModel } from './BaseModel';
import { Product } from './Product';

export class OrderLine extends BaseModel {
  public static dbName = 'orderLines';
  public id: string;
  public orderId: string;
  public amount: number;
  public product: Product;

  public totalPrice: number;

  constructor(id: string, orderId: string, amount: number, product: Product) {
    super(id);
    this.orderId = orderId;
    this.amount = amount;
    this.product = product;
  }

  public calculatePrice() {
    this.totalPrice = this.amount * Number(this.product.price);
  }
}
