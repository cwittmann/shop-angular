import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Product } from 'src/app/shared/model/Product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  get shoppingCart(): Product[] {
    return this.storeService.shoppingCart;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}
}
