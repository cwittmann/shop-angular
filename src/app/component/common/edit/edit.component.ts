import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from 'src/app/shared/model/BaseModel';
import { v4 as uuidv4 } from 'uuid';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { StoreService } from 'src/app/shared/service/store.service';
import { ActivatedRoute } from '@angular/router';
import { OrderStatus } from 'src/app/shared/enum/OrderStatus';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input()
  model: IGenericModel<any>;

  @Input()
  nestedModel: IGenericModel<any>;

  @Input()
  secondaryNestedModel: IGenericModel<any>;

  @Input()
  columns: Column[];

  id: string;

  get item(): any {
    return this.getItem();
  }

  get options(): any[] {
    return this.storeService[this.nestedModel.dbNamePlural];
  }

  get secondaryOptions(): any[] {
    return this.storeService[this.secondaryNestedModel.dbNamePlural];
  }

  isNew: boolean = false;
  newItem: any;

  orderStatusTypes = OrderStatus;
  orderStatusTypeOptions = [];

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.isNew = !this.id;
  }

  ngOnInit(): void {
    if (this.isNew) {
      this.initializeNewItem();
    }

    this.orderStatusTypeOptions = Object.keys(this.orderStatusTypes)
      .map((key) => this.orderStatusTypes[key])
      .filter((value) => typeof value == 'string') as string[];
  }

  getItem() {
    if (this.isNew) {
      return this.newItem;
    }

    return this.storeService[this.model.dbNamePlural].find(
      (item) => item.id === this.id
    );
  }

  initializeNewItem() {
    this.newItem = new this.model(uuidv4());

    for (let column of this.columns) {
      this.newItem[column.name] = this.getDefaultValueForDataType(column);
    }
  }

  getDefaultValueForDataType(column: Column) {
    switch (column.dataType) {
      case 'date':
        return new Date(1900, 1, 1);
      case 'text':
        return column.displayName;
      case 'status':
        return 'Created';
      case 'number':
        return 0;
      case 'select':
      case 'default':
        return null;
    }
  }

  async save<T extends BaseModel>() {
    if (this.isNew) {
      await this.storeService.post<T>(this.item, this.model.dbNamePlural);
    } else {
      await this.storeService.put<T>(this.item, this.model.dbNamePlural);
    }

    this.storeService.reload();
    this.ngOnInit();
  }

  setOption(isSecondary: boolean, event) {
    let optionId = event.target.value;

    if (isSecondary) {
      let option = this.secondaryOptions.find(
        (option) => option.id === optionId
      );
      this.item[this.secondaryNestedModel.dbNameSingular + 'Id'] = option.id;
      this.item[this.secondaryNestedModel.dbNameSingular] = option;
      return;
    }
    let option = this.options.find((option) => option.id === optionId);
    this.item[this.nestedModel.dbNameSingular + 'Id'] = option.id;
    this.item[this.nestedModel.dbNameSingular] = option;
  }
}
