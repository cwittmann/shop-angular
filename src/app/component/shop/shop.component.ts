import { Component, OnInit, ViewChildren } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Product } from 'src/app/shared/model/Product';
import { v4 as uuidv4 } from 'uuid';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';
import { OrderLineViewModel } from 'src/app/shared/model/OrderLineViewModel';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  numbers: Number[] = [1, 2, 3];

  @ViewChildren('linkRef') linkRefs;

  get products(): Product[] {
    return this.storeService.products;
  }

  get shoppingCart(): OrderViewModel {
    return this.storeService.shoppingCart;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}

  isInOrder(productId: string) {
    return this.shoppingCart.orderLines.some(
      (orderLine) => orderLine.productId === productId
    );
  }

  getAmount(productId: string) {
    return this.shoppingCart.orderLines.find(
      (orderLine) => orderLine.productId === productId
    ).amount;
  }

  addToCart(product: Product) {
    let amount = this.linkRefs.find(
      (linkRef) => linkRef.nativeElement.id === product.id
    ).nativeElement.value;

    if (
      !this.shoppingCart.orderLines.find(
        (orderLine) => orderLine.productId === product.id
      )
    ) {
      let orderLine: OrderLineViewModel = new OrderLineViewModel(
        uuidv4(),
        this.shoppingCart.id,
        amount,
        product
      );
      this.shoppingCart.orderLines.push(orderLine);
    }
  }

  removeFromCart(product: Product) {
    let orderLineWithProduct = this.shoppingCart.orderLines.find(
      (orderLine) => orderLine.productId === product.id
    );

    this.shoppingCart.orderLines.splice(
      this.shoppingCart.orderLines.indexOf(orderLineWithProduct),
      1
    );
  }
}
