import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Role } from 'src/app/shared/model/Role';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  newRole: Role;
  showNew: boolean = false;

  get roles(): Role[] {
    return this.storeService.roles;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.newRole = new Role(uuidv4(), 'New role');
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(role: Role) {
    await this.storeService.putRole(role);
    this.storeService.reload();
    this.ngOnInit();
  }

  async saveNewInput(newRole: Role) {
    await this.storeService.postRole(newRole);
    this.storeService.reload();
    this.ngOnInit();
    this.toggleNew();
  }

  async deleteInput(id: string) {
    await this.storeService.deleteRole(id);
    this.storeService.reload();
    this.ngOnInit();
  }
}
