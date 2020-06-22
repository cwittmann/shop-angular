import { Component, OnInit } from '@angular/core';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { User } from 'src/app/shared/model/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  genericModel: IGenericModel<any>;
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = User;
    this.columns = [
      new Column('firstName', 'First name', 'text', false, false, true),
      new Column('lastName', 'Last name', 'text', false, false, true),
      new Column('city', 'City', 'text', false, false, true),
      new Column('userName', 'User Name', 'text', false, false, true),
      new Column('password', 'Password', 'text', false, false, false),
      new Column('role', 'Role', 'select', false, false, false),
    ];
  }
}
