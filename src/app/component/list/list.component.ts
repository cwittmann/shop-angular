import { Component, OnInit, Input, Type } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { v4 as uuidv4 } from 'uuid';
import { Column } from 'src/app/shared/model/Column';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { BaseModel } from 'src/app/shared/model/BaseModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input()
  model: IGenericModel<any>;

  @Input()
  columns: Column[];

  itemLink: any;

  get items(): any[] {
    return this.itemLink;
  }

  newItem: any;
  showNew: boolean = false;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.itemLink = this.storeService[this.model.dbName];
    this.newItem = new this.model(uuidv4());
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveNewInput<T>(newItem: T) {
    await this.storeService.post<T>(newItem, this.model.dbName);
    this.storeService.reload();
    this.ngOnInit();
    this.toggleNew();
  }

  async saveEditedInput<T extends BaseModel>(item: T) {
    await this.storeService.put<T>(item, this.model.dbName);
    this.storeService.reload();
    this.ngOnInit();
  }

  async deleteInput<T>(id: string) {
    await this.storeService.delete<T>(id, this.model.dbName);
    this.storeService.reload();
    this.ngOnInit();
  }
}
