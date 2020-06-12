import { Component, OnInit } from '@angular/core';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { Attribute } from 'src/app/shared/model/Attribute';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss'],
})
export class AttributeListComponent implements OnInit {
  genericModel: IGenericModel<any>;
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
