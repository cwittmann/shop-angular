import { BaseModel } from './BaseModel';
import { Product } from './Product';

export class OrderLine extends BaseModel {
  public static dbNameSingular = 'orderLine';
  public static dbNamePlural = 'orderLines';
  public static route = 'order-line';
  public static searchFields = [];
  public static icon = '';

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
