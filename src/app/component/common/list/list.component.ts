import { Component, OnInit, Input, Type } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Column } from 'src/app/shared/model/Column';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

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

  config: any;

  showSearchBar: boolean = false;
  searchText: string;
  searchPlaceholder: string;

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.items.length,
    };

    this.showSearchBar = this.model.searchFields?.length > 0;
    this.searchPlaceholder = this.model.searchFields.join(', ');
  }

  create() {
    let id = uuidv4();
    this.router.navigate(['/' + this.model.route + '-new/' + id]);
  }

  edit(item: any) {
    this.router.navigate(['/' + this.model.route + '-detail/' + item.id]);
  }

  async delete<T>(id: string) {
    await this.storeService.delete<T>(id, this.model.dbNamePlural);
    await this.storeService.reload();
    this.ngOnInit();
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
