import { Component, OnInit } from '@angular/core';
import { Right } from 'src/app/shared/model/Right';
import { StoreService } from 'src/app/shared/service/store.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-right-list',
  templateUrl: './right-list.component.html',
  styleUrls: ['./right-list.component.scss'],
})
export class RightListComponent implements OnInit {
  newRight: Right;
  showNew: boolean;

  get rights(): Right[] {
    return this.storeService.rights;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.newRight = new Right(uuidv4(), 'Entity', 'Permission');
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(right: Right) {
    await this.storeService.putRight(right);
    this.storeService.reload();
    this.ngOnInit();
  }

  async saveNewInput(newRight: Right) {
    await this.storeService.postRight(newRight);
    this.storeService.reload();
    this.ngOnInit();
    this.toggleNew();
  }

  async deleteInput(id: string) {
    await this.storeService.deleteRight(id);
    this.storeService.reload();
    this.ngOnInit();
  }
}
