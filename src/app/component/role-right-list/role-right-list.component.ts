import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { User } from 'src/app/shared/model/User';
import { Right } from 'src/app/shared/model/Right';
import { RoleRight } from 'src/app/shared/model/RoleRight';
import { v4 as uuidv4 } from 'uuid';
import { Role } from 'src/app/shared/model/Role';

@Component({
  selector: 'app-role-right-list',
  templateUrl: './role-right-list.component.html',
  styleUrls: ['./role-right-list.component.scss'],
})
export class RoleRightListComponent implements OnInit {
  newRoleRight: RoleRight;
  showNew: boolean = false;

  get roleRights(): RoleRight[] {
    return this.storeService.roleRights;
  }

  get rights(): Right[] {
    return this.storeService.rights;
  }

  get roles(): Role[] {
    return this.storeService.roles;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.newRoleRight = new RoleRight(uuidv4(), null, null);
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(roleRight: RoleRight) {
    await this.storeService.putRoleRight(roleRight);
    this.storeService.reload();
    this.ngOnInit();
  }

  async saveNewInput(newRoleRight: RoleRight) {
    await this.storeService.postRoleRight(newRoleRight);
    this.storeService.reload();
    this.ngOnInit();
    this.toggleNew();
  }

  async deleteInput(id: string) {
    await this.storeService.deleteRoleRight(id);
    this.storeService.reload();
    this.ngOnInit();
  }
}
