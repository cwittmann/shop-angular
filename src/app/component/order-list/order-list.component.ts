import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/model/Order';
import { StoreService } from 'src/app/shared/service/store.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/User';
import { OrderStatus } from 'src/app/shared/enum/OrderStatus';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  newOrder: Order;
  showNew: boolean = false;
  orderStatusTypes = OrderStatus;
  orderStatusTypeOptions = [];

  get orders(): Order[] {
    return this.storeService.orders;
  }

  get users(): User[] {
    return this.storeService.users;
  }

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit(): void {
    this.orderStatusTypeOptions = Object.keys(this.orderStatusTypes)
      .map((key) => this.orderStatusTypes[key])
      .filter((value) => typeof value == 'string') as string[];
  }

  async loadOrder(id: string) {
    await this.storeService.loadOrder(id);
    this.router.navigate(['/order-detail/', id]);
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(order: Order) {
    console.log(order);
    await this.storeService.putOrder(order);
    window.location.reload();
  }

  async deleteInput(id: string) {
    await this.storeService.deleteOrder(id);
    window.location.reload();
  }
}
