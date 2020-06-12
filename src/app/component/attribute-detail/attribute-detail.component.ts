import { Component, OnInit } from '@angular/core';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { Attribute } from 'src/app/shared/model/Attribute';

@Component({
  selector: 'app-attribute-detail',
  templateUrl: './attribute-detail.component.html',
  styleUrls: ['./attribute-detail.component.scss'],
})
export class AttributeDetailComponent implements OnInit {
  genericModel: IGenericModel<any>;
  nestedModel: IGenericModel<any>;
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = Attribute;

    this.columns = [
      new Column('name', 'Name', 'text'),
      new Column('value', 'Value', 'text'),
    ];
  }
}
