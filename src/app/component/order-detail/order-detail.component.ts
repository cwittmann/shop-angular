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
      1,
      null
    );
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(orderLine: OrderLine) {
    await this.storeService.put<OrderLine>(orderLine, 'orderLines');
    this.storeService.reload();
    this.ngOnInit();
  }

  async saveNewInput(newOrderLine: OrderLine) {
    await this.storeService.post<OrderLine>(newOrderLine, 'orderLines');
    this.storeService.reload();
    this.ngOnInit();
    this.toggleNew();
  }

  async deleteInput(id: string) {
    await this.storeService.delete<OrderLine>(id, 'orderLines');
    this.storeService.reload();
    this.ngOnInit();
  }

  setProduct(orderLine: OrderLine, event) {
    let productId = event.target.value;
    let product = this.storeService.products.find(
      (product) => product.id === productId
    );
    orderLine.product = product;
  }
}
