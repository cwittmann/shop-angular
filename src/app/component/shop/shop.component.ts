import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Router } from '@angular/router';
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

  get shoppingCart(): string[] {
    return this.storeService.shoppingCart;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}

  addToCart(productId: string) {
    if (!this.shoppingCart.includes(productId)) {
      this.shoppingCart.push(productId);
    }
  }

  removeFromCart(productId: string) {
    this.shoppingCart.splice(this.shoppingCart.indexOf(productId), 1);
  }
}
