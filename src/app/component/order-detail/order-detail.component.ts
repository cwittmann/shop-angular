import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';
import { OrderLine } from 'src/app/shared/model/OrderLine';
import { v4 as uuidv4 } from 'uuid';
import { Product } from 'src/app/shared/model/Product';
import { ActivatedRoute } from '@angular/router';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { Order } from 'src/app/shared/model/Order';
import { User } from 'src/app/shared/model/User';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  genericModel: IGenericModel<any>;
  secondaryGenericModel: IGenericModel<any>;
  nestedModel: IGenericModel<any>;
  secondaryNestedModel: IGenericModel<any>;
  columns: Column[];
  secondaryColumns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = Order;
    this.secondaryGenericModel = OrderLine;
    this.nestedModel = User;
    this.secondaryNestedModel = Product;
    this.columns = [
      new Column('date', 'Date', 'date'),
      new Column('user', 'User', 'select'),
      new Column('status', 'Status', 'status'),
    ];
    this.secondaryColumns = [
      new Column('product', 'Product', 'select'),
      new Column('amount', 'Amount', 'number'),
    ];
  }
}
