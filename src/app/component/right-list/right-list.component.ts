import { Component, OnInit } from '@angular/core';
import { Right } from 'src/app/shared/model/Right';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';

@Component({
  selector: 'app-right-list',
  templateUrl: './right-list.component.html',
  styleUrls: ['./right-list.component.scss'],
})
export class RightListComponent implements OnInit {
  genericModel: IGenericModel<any>;
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = Right;
    this.columns = [
      new Column('entity', 'Entity', 'text'),
      new Column('permission', 'Permission', 'text'),
    ];
  }
}
