import { Component, OnInit, Input } from '@angular/core';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { StoreService } from 'src/app/shared/service/store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseModel } from 'src/app/shared/model/BaseModel';
import { v4 as uuidv4 } from 'uuid';
import { OrderLine } from 'src/app/shared/model/OrderLine';
import { Attribute } from 'src/app/shared/model/Attribute';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1, transform: 'scale(1,1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0,0)' }),
        animate('400ms {{delay}}ms cubic-bezier(0.680, -0.550, 0.265, 1.550)'),
      ]),
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class LinesComponent implements OnInit {
  @Input()
  model: IGenericModel<any>;

  @Input()
  nestedModel: IGenericModel<any>;

  @Input()
  parentId: string;

  @Input()
  columns: Column[];

  newItem: any;
  showNew: boolean = false;

  errors: string[] = [];

  get items(): any[] {
    if (this.model?.name === 'OrderLine') {
      return this.storeService[this.model.dbNamePlural].filter(
        (item) => item.orderId === this.parentId
      );
    }
    if (this.model?.name === 'Attribute') {
      return this.storeService[this.model.dbNamePlural].filter(
        (item) => item.productId === this.parentId
      );
    }
  }

  get options(): any[] {
    return this.storeService[this.nestedModel.dbNamePlural];
  }

  constructor(
    private storeService: StoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.parentId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {}

  create() {
    this.showNew = true;
    this.initializeNewItem();
  }

  edit(item: any) {
    this.router.navigate(['/' + this.model.route + '-detail/' + item.id]);
  }

  async delete<T>(id: string) {
    await this.storeService.delete<T>(id, this.model.dbNamePlural);
    await this.storeService.reload();
    await this.ngOnInit();
    this.snackBar.open(this.model.name + ' deleted.', null, {
      duration: 5000,
      panelClass: 'snackbar',
    });
  }

  async save<T extends BaseModel>(item: any, isNew: boolean) {
    if (!this.validate(item)) {
      return;
    }

    if (isNew) {
      await this.storeService.post<T>(item, this.model.dbNamePlural);
    } else {
      await this.storeService.put<T>(item, this.model.dbNamePlural);
    }

    this.showNew = false;
    await this.storeService.reload();
    await this.ngOnInit();
    this.snackBar.open(this.model.name + ' saved.', null, {
      duration: 5000,
      panelClass: 'snackbar',
    });
  }

  validate(item: any): boolean {
    this.errors = [];

    let valid = true;

    for (let column of this.columns) {
      if (column.dataType === 'date') {
        continue;
      }

      let value = item[column.name];
      let defaultValue = this.getDefaultValueForDataType(column);

      if (value === defaultValue) {
        this.errors.push('Invalid value for "' + column.displayName + '"');
        valid = false;
      }
    }

    return valid;
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

  setOption(item: any, event) {
    let optionId = event.target.value;
    let option = this.options.find((option) => option.id === optionId);
    item[this.nestedModel.dbNameSingular + 'Id'] = option.id;
    item[this.nestedModel.dbNameSingular] = option;
  }

  initializeNewItem() {
    if (this.model?.name === 'OrderLine') {
      this.newItem = new OrderLine(uuidv4(), this.parentId, 0, null);
    }
    if (this.model?.name === 'Attribute') {
      this.newItem = new Attribute(uuidv4(), this.parentId, '', '', '');
    }
  }
}
