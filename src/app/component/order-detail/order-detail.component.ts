import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  get order(): OrderViewModel {
    let currentOrder = this.storeService.currentOrder;
    currentOrder.calculatePrices();
    return currentOrder;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}
}
