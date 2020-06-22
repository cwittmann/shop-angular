import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/model/Role';
import { Column } from 'src/app/shared/model/Column';
import { IGenericModel } from 'src/app/shared/model/GenericModel';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  genericModel: IGenericModel<any>;
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = Role;
    this.columns = [new Column('name', 'Name', 'text', false, false, true)];
  }
}
