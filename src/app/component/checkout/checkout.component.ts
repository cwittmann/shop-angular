import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Order } from 'src/app/shared/model/Order';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  get shoppingCart(): OrderViewModel {
    let shoppingCart = this.storeService.shoppingCart;
    shoppingCart.calculatePrices();
    return shoppingCart;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}
}
