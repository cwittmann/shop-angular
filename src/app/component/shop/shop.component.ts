import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Product } from 'src/app/shared/model/Product';
import { v4 as uuidv4 } from 'uuid';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';
import { ProductViewModel } from 'src/app/shared/model/ProductViewModel';
import { OrderLineViewModel } from 'src/app/shared/model/OrderLineViewModel';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  get products(): ProductViewModel[] {
    return this.storeService.products;
  }

  get shoppingCart(): OrderViewModel {
    return this.storeService.shoppingCart;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}

  isInOrder(product: Product) {
    return this.shoppingCart.orderLines.some(
      (orderLine) => orderLine.productId === product.id
    );
  }

  addToCart(product: Product) {
    if (
      !this.shoppingCart.orderLines.find(
        (orderLine) => orderLine.productId === product.id
      )
    ) {
      let orderLine: OrderLineViewModel = new OrderLineViewModel(
        uuidv4(),
        this.shoppingCart.id,
        1,
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
