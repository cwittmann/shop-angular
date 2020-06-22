import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/model/Order';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  genericModel: IGenericModel<any>;
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = Order;
    this.columns = [
      new Column('date', 'Date', 'date', false, false, true),
      new Column('user', 'User', 'select', false, false, false),
      new Column('status', 'Status', 'status', false, false, true),
    ];
  }
}
