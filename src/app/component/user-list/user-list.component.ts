import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { User } from 'src/app/shared/model/User';
import { v4 as uuidv4 } from 'uuid';
import { Role } from 'src/app/shared/model/Role';

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

  get roles(): Role[] {
    return this.storeService.roles;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.newUser = new User(
      uuidv4(),
      'First name',
      'Last name',
      'City',
      null,
      null
    );
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(user: User) {
    await this.storeService.put<User>(user, 'users');
    this.storeService.reload();
    this.ngOnInit();
  }

  async saveNewInput(newUser: User) {
    await this.storeService.post<User>(newUser, 'users');
    this.storeService.reload();
    this.ngOnInit();
    this.toggleNew();
  }

  async deleteInput(id: string) {
    await this.storeService.delete<User>(id, 'users');
    this.storeService.reload();
    this.ngOnInit();
  }

  setRole(user: User, event) {
    let roleId = event.target.value;
    let role = this.storeService.roles.find((role) => role.id === roleId);
    user.role = role;
    console.log(this.users);
  }
}
