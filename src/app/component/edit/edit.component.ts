import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from 'src/app/shared/model/BaseModel';
import { v4 as uuidv4 } from 'uuid';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { StoreService } from 'src/app/shared/service/store.service';
import { ActivatedRoute } from '@angular/router';

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
  columns: Column[];

  id: string;

  get item(): any {
    return this.storeService[this.model.dbNamePlural].find(
      (item) => item.id === this.id
    );
  }

  get options(): any[] {
    return this.storeService[this.nestedModel.dbNamePlural];
  }

  isNew: boolean;
  newItem: any;

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.newItem = new this.model(uuidv4());
  }

  async save<T extends BaseModel>() {
    console.log(this.item[this.nestedModel.dbNameSingular]);
    await this.storeService.put<T>(this.item, this.model.dbNamePlural);
    this.storeService.reload();
    this.ngOnInit();
  }

  setOption(event) {
    let optionId = event.target.value;
    let option = this.options.find((option) => option.id === optionId);
    this.item[this.nestedModel.dbNameSingular + 'Id'] = option.id;
    this.item[this.nestedModel.dbNameSingular] = option;
  }
}
