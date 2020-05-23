import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/model/Order';
import { StoreService } from 'src/app/shared/service/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  get orders(): Order[] {
    return this.storeService.orders;
  }

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit(): void {}

  loadOrders() {
    this.storeService.loadOrders();
  }

  loadOrder(id: String) {
    this.storeService.loadOrder(id);
    this.router.navigate(['/order-detail/', id]);
  }
}
