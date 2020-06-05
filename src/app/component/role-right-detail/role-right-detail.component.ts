import { Component, OnInit } from '@angular/core';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { RoleRight } from 'src/app/shared/model/RoleRight';
import { Role } from 'src/app/shared/model/Role';
import { Right } from 'src/app/shared/model/Right';

@Component({
  selector: 'app-role-right-detail',
  templateUrl: './role-right-detail.component.html',
  styleUrls: ['./role-right-detail.component.scss'],
})
export class RoleRightDetailComponent implements OnInit {
  genericModel: IGenericModel<any>;
  nestedModel: IGenericModel<any>;
  secondaryNestedModel: IGenericModel<any>;
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = RoleRight;
    this.nestedModel = Role;
    this.secondaryNestedModel = Right;
    this.columns = [
      new Column('role', 'Role', 'select'),
      new Column('right', 'Right', 'select', true),
    ];
  }
}
