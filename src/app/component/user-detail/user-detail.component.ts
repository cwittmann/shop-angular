import { Component, OnInit } from '@angular/core';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { User } from 'src/app/shared/model/User';
import { Role } from 'src/app/shared/model/Role';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  genericModel: IGenericModel<any>;
  nestedModel: IGenericModel<any>;
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = User;
    this.nestedModel = Role;
    this.columns = [
      new Column('firstName', 'First name', 'text'),
      new Column('lastName', 'Last name', 'text'),
      new Column('city', 'City', 'text'),
      new Column('userName', 'User Name', 'text'),
      new Column('password', 'Password', 'password'),
      new Column('role', 'Role', 'select'),
    ];
  }
}
