import { Component, OnInit } from '@angular/core';
import { RoleRight } from 'src/app/shared/model/RoleRight';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';

@Component({
  selector: 'app-role-right-list',
  templateUrl: './role-right-list.component.html',
  styleUrls: ['./role-right-list.component.scss'],
})
export class RoleRightListComponent implements OnInit {
  genericModel: IGenericModel<any>;
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = RoleRight;
    this.columns = [
      new Column('role', 'Role', 'select'),
      new Column('right', 'Right', 'select'),
    ];
  }
}
