import { Component, OnInit, Input } from '@angular/core';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Column } from 'src/app/shared/model/Column';
import { StoreService } from 'src/app/shared/service/store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseModel } from 'src/app/shared/model/BaseModel';

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

  get items(): any[] {
    return this.storeService[this.model.dbNamePlural].filter(
      (item) => item.orderId === this.parentId
    );
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
    alert('CREATE');
  }

  edit(item: any) {
    this.router.navigate(['/' + this.model.route + '-detail/' + item.id]);
  }

  delete(id: string) {
    alert('DELETE');
  }

  async save<T extends BaseModel>(item: any) {
    await this.storeService.put<T>(item, this.model.dbNamePlural);
    this.storeService.reload();
    this.ngOnInit();
  }

  setOption(item: any, event) {
    let optionId = event.target.value;
    let option = this.options.find((option) => option.id === optionId);
    item[this.nestedModel.dbNameSingular + 'Id'] = option.id;
    item[this.nestedModel.dbNameSingular] = option;
  }
}
