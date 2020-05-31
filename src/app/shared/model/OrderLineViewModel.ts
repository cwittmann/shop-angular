import { Product } from './Product';
import { OrderLine } from './OrderLine';

export class OrderLineViewModel extends OrderLine {
  public product: Product;
  public totalPrice: number;

  constructor(id: string, orderId: string, amount: number, product: Product) {
    super(id, orderId, product.id, amount);
    this.product = product;
  }
  public calculatePrice() {
    this.totalPrice = this.amount * Number(this.product.price);
  }
}
