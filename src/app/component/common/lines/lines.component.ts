import { Component, OnInit, Input } from '@angular/core';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { StoreService } from 'src/app/shared/service/store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseModel } from 'src/app/shared/model/BaseModel';
import { v4 as uuidv4 } from 'uuid';
import { Order } from 'src/app/shared/model/Order';
import { Product } from 'src/app/shared/model/Product';
import { OrderLine } from 'src/app/shared/model/OrderLine';
import { Attribute } from 'src/app/shared/model/Attribute';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss'],
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

  get items(): any[] {
    if (this.model.name === 'OrderLine') {
      return this.storeService[this.model.dbNamePlural].filter(
        (item) => item.orderId === this.parentId
      );
    }
    if (this.model.name === 'Attribute') {
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
    private activatedRoute: ActivatedRoute
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
    this.ngOnInit();
  }

  async save<T extends BaseModel>(item: any, isNew: boolean) {
    if (isNew) {
      await this.storeService.post<T>(item, this.model.dbNamePlural);
    } else {
      await this.storeService.put<T>(item, this.model.dbNamePlural);
    }

    this.showNew = false;
    await this.storeService.reload();
    this.ngOnInit();
  }

  setOption(item: any, event) {
    let optionId = event.target.value;
    let option = this.options.find((option) => option.id === optionId);
    item[this.nestedModel.dbNameSingular + 'Id'] = option.id;
    item[this.nestedModel.dbNameSingular] = option;
  }

  initializeNewItem() {
    if (this.model.name === 'OrderLine') {
      this.newItem = new OrderLine(uuidv4(), this.parentId, 0, null);
    }
    if (this.model.name === 'Attribute') {
      this.newItem = new Attribute(uuidv4(), this.parentId, '', '');
    }
  }
}
