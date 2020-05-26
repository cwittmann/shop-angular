import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';
import { OrderLineViewModel } from 'src/app/shared/model/OrderLineViewModel';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  get order(): OrderViewModel {
    return this.storeService.currentOrder;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}
}
