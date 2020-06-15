import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from 'src/app/shared/model/BaseModel';
import { v4 as uuidv4 } from 'uuid';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { StoreService } from 'src/app/shared/service/store.service';
import { ActivatedRoute } from '@angular/router';
import { OrderStatus } from 'src/app/shared/enum/OrderStatus';
import { Permission } from 'src/app/shared/enum/Permission';

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

  permissionTypes = Permission;
  permissionTypeOptions = [];

  selectedFile: File;

  errors: string[] = [];

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

    this.permissionTypeOptions = Object.keys(this.permissionTypes)
      .map((key) => this.permissionTypes[key])
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
        return new Date();
      case 'text':
      case 'password':
        return '';
      case 'number':
        return 0;
      case 'select':
      case 'default':
        return null;
    }
  }

  async save<T extends BaseModel>() {
    if (!this.validate()) {
      return;
    }

    this.saveImage();

    if (this.isNew) {
      await this.storeService.post<T>(this.item, this.model.dbNamePlural);
    } else {
      await this.storeService.put<T>(this.item, this.model.dbNamePlural);
    }

    this.storeService.reload();
    this.ngOnInit();
  }

  saveImage() {
    const uploadImageData = new FormData();
    uploadImageData.append(
      'imageFile',
      this.selectedFile,
      this.selectedFile.name
    );

    uploadImageData.append('id', this.isNew ? this.newItem.id : this.item.id);

    this.storeService.postImage(uploadImageData);
  }

  validate(): boolean {
    this.errors = [];

    let valid = true;

    for (let column of this.columns) {
      if (column.dataType === 'date') {
        continue;
      }

      if (column.dataType === 'file') {
        if (!this.selectedFile) {
          this.errors.push('No file selected.');
          valid = false;
        }
        continue;
      }

      let value = this.item[column.name];
      let defaultValue = this.getDefaultValueForDataType(column);

      if (value === defaultValue) {
        this.errors.push('Invalid value for "' + column.displayName + '"');
        valid = false;
      }
    }

    return valid;
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

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
}
