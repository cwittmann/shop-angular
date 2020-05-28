import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { User } from 'src/app/shared/model/User';
import { Right } from 'src/app/shared/model/Right';
import { UserRight } from 'src/app/shared/model/UserRight';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user-right-list',
  templateUrl: './user-right-list.component.html',
  styleUrls: ['./user-right-list.component.scss'],
})
export class UserRightListComponent implements OnInit {
  newUserRight: UserRight;
  showNew: boolean = false;

  get userRights(): UserRight[] {
    return this.storeService.userRights;
  }

  get rights(): Right[] {
    return this.storeService.rights;
  }

  get users(): User[] {
    return this.storeService.users;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.newUserRight = new UserRight(uuidv4(), null, null);
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(userRight: UserRight) {
    await this.storeService.putUserRight(userRight);
    this.storeService.reload();
    this.ngOnInit();
  }

  async saveNewInput(newUserRight: UserRight) {
    await this.storeService.postUserRight(newUserRight);
    this.storeService.reload();
    this.ngOnInit();
    this.toggleNew();
  }

  async deleteInput(id: string) {
    await this.storeService.deleteUserRight(id);
    this.storeService.reload();
    this.ngOnInit();
  }
}
