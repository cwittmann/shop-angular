import { Product } from './Product';

export class OrderLineViewModel {
  public id: string;
  public orderId: string;
  public productId: string;
  public amount: number;

  public product: Product;
  public totalPrice: number;

  constructor(id: string, orderId: string, amount: number, product: Product) {
    this.id = id;
    this.orderId = orderId;
    this.productId = product.id;
    this.amount = amount;
    this.product = product;
  }

  public calculatePrice() {
    this.totalPrice = this.amount * Number(this.product.price);
  }
}
