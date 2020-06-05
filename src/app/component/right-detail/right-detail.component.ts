import { Component, OnInit } from '@angular/core';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { Right } from 'src/app/shared/model/Right';

@Component({
  selector: 'app-right-detail',
  templateUrl: './right-detail.component.html',
  styleUrls: ['./right-detail.component.scss'],
})
export class RightDetailComponent implements OnInit {
  genericModel: IGenericModel<any>;
  nestedModel: IGenericModel<any>;
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
