import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/model/Order';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}

  get orders(): Order[] {
    return this.storeService.orders;
  }

  loadOrders() {
    this.storeService.loadOrders();
  }
}
