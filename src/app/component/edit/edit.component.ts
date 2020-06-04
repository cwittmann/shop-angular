import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from 'src/app/shared/model/BaseModel';
import { v4 as uuidv4 } from 'uuid';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input()
  model: IGenericModel<any>;

  @Input()
  columns: Column[];

  itemLink: any[];

  get items(): any[] {
    return this.storeService[this.model.dbName];
  }

  options: Map<string, any[]>;

  newItem: any;
  showNew: boolean = false;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.newItem = new this.model(uuidv4());
    this.options = new Map<string, any[]>();

    for (let column of this.columns) {
      if (column.dataType === 'select') {
        let columnOptions = this.storeService[column.name + 's'];
        this.options.set(column.name, columnOptions);
      }
    }
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

  setOption(item: any, event) {
    let manufacturerId = event.target.value;
    let manufacturer = this.storeService.manufacturers.find(
      (manufacturer) => manufacturer.id === manufacturerId
    );
    item.manufacturerId = manufacturer.id;
    item.manufacturer = manufacturer;
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
