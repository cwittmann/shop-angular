import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/model/Order';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  get order(): Order {
    return this.storeService.currentOrder;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}
}
