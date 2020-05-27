import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';
import { ModelConverterService } from 'src/app/shared/service/model-converter.service';
import { BackendService } from 'src/app/shared/service/backend.service';

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

  constructor(
    private storeService: StoreService,
    private backendService: BackendService,
    private modelConverterService: ModelConverterService
  ) {}

  ngOnInit(): void {}

  async confirm() {
    await this.modelConverterService.convertOrderViewModelToModels();
    this.backendService.saveOrder(this.storeService.shoppingCart);
  }
}
