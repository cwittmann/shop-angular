import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';
import { OrderLine } from 'src/app/shared/model/OrderLine';
import { v4 as uuidv4 } from 'uuid';
import { Product } from 'src/app/shared/model/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  newOrderLine: OrderLine;
  showNew: boolean = false;

  get order(): OrderViewModel {
    return this.storeService.currentOrder;
  }

  get products(): Product[] {
    return this.storeService.products;
  }

  constructor(private storeService: StoreService) {}

  async ngOnInit(): Promise<void> {
    this.newOrderLine = new OrderLine(
      uuidv4(),
      this.storeService.currentOrder.id,
      null,
      1
    );
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(orderLine: OrderLine) {
    await this.storeService.putOrderLine(orderLine);
    this.storeService.reload();
  }

  async saveNewInput(newOrderLine: OrderLine) {
    await this.storeService.postOrderLine(newOrderLine);
    this.storeService.reload();
  }

  async deleteInput(id: string) {
    await this.storeService.deleteOrderLine(id);
    this.storeService.reload();
  }
}
