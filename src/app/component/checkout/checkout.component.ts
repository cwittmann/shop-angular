import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';
import { ModelConverterService } from 'src/app/shared/service/model-converter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  isSaved: boolean = false;
  subscription: Subscription;

  get shoppingCart(): OrderViewModel {
    let shoppingCart = this.storeService.shoppingCart;
    shoppingCart.calculatePrices();
    return shoppingCart;
  }

  constructor(
    private storeService: StoreService,
    private modelConverterService: ModelConverterService
  ) {
    this.subscription = this.modelConverterService.savedSuccessfully.subscribe(
      () => {
        this.isSaved = true;
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async confirm() {
    this.storeService.saveOrder();
  }
}
