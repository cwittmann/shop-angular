import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { User } from 'src/app/shared/model/User';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  newUser: User;
  showNew: boolean = false;

  get users(): User[] {
    return this.storeService.users;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.newUser = new User(uuidv4(), 'First name', 'Last name', 'City');
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(user: User) {
    await this.storeService.putUser(user);
    this.storeService.reload();
  }

  async saveNewInput(newUser: User) {
    await this.storeService.postUser(newUser);
    this.storeService.reload();
  }

  async deleteInput(id: string) {
    await this.storeService.deleteUser(id);
    this.storeService.reload();
  }
}
