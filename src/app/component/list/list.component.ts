import { Component, OnInit, Input, Type } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Column } from 'src/app/shared/model/Column';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Router } from '@angular/router';

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

  get items(): any[] {
    return this.storeService[this.model.dbNamePlural];
  }

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit(): void {}

  create() {
    alert('CREATE');
  }

  edit(item: any) {
    this.router.navigate(['/product-detail/' + item.id]);
  }

  delete(id: string) {
    alert('DELETE');
  }
}
