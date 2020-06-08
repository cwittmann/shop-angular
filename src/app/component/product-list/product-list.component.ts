import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/model/Product';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  genericModel: IGenericModel<any>;
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = Product;
    this.columns = [
      new Column('name', 'Name', 'text'),
      new Column('description', 'Description', 'text'),
      new Column('price', 'Price', 'text'),
      new Column('category', 'Category', 'select'),
      new Column('manufacturer', 'Manufacturer', 'select'),
    ];
  }
}
