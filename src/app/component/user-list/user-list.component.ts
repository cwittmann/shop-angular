import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { User } from 'src/app/shared/model/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  get users(): User[] {
    return this.storeService.users;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}
}
