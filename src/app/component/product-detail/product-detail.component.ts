import { Component, OnInit } from '@angular/core';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { Product } from 'src/app/shared/model/Product';
import { Manufacturer } from 'src/app/shared/model/Manufacturer';
import { Category } from 'src/app/shared/model/Category';
import { Attribute } from 'src/app/shared/model/Attribute';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  genericModel: IGenericModel<any>;
  secondaryGenericModel: IGenericModel<any>;
  nestedModel: IGenericModel<any>;
  secondaryNestedModel: IGenericModel<any>;
  columns: Column[];
  secondaryColumns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = Product;
    this.secondaryGenericModel = Attribute;
    this.nestedModel = Category;
    this.secondaryNestedModel = Manufacturer;
    this.columns = [
      new Column('name', 'Name', 'text'),
      new Column('description', 'Description', 'text'),
      new Column('price', 'Price', 'text'),
      new Column('category', 'Category', 'select'),
      new Column('manufacturer', 'Manufacturer', 'select', true),
      new Column('image', 'Image', 'file'),
    ];
    this.secondaryColumns = [
      new Column('name', 'Name', 'text'),
      new Column('value', 'Value', 'text'),
      new Column('info', 'Info', 'text'),
    ];
  }
}
