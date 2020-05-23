export class OrderLine {
  public id: string;
  public orderId: string;
  public productId: string;
  public amount: number;

  public OrderLine(
    id: string,
    orderId: string,
    productId: string,
    amount: number
  ) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.amount = amount;
  }
}
