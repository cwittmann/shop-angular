import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Product } from 'src/app/shared/model/Product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  get products(): Product[] {
    return this.storeService.products;
  }

  get shoppingCart(): Product[] {
    return this.storeService.shoppingCart;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    if (!this.shoppingCart.includes(product)) {
      this.shoppingCart.push(product);
    }
  }

  removeFromCart(product: Product) {
    this.shoppingCart.splice(this.shoppingCart.indexOf(product), 1);
  }
}
