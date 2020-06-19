import { Component, OnInit, Input, Type } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Column } from 'src/app/shared/model/Column';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1, transform: 'scale(1,1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0,0)' }),
        animate('400ms {{delay}}ms cubic-bezier(0.680, -0.550, 0.265, 1.550)'),
      ]),
      transition(':leave', animate(100, style({ opacity: 0 }))),
    ]),

    trigger('fadeLeft', [
      state('in', style({ opacity: 1, transform: 'translate(0, 0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translate(1000px, 0)' }),
        animate('800ms cubic-bezier(0.680, -0.550, 0.265, 1.550)'),
      ]),
      transition(':leave', animate(100, style({ opacity: 0 }))),
    ]),
  ],
})
export class ListComponent implements OnInit {
  @Input()
  model: IGenericModel<any>;

  @Input()
  columns: Column[];

  get items(): any[] {
    return this.storeService[this.model?.dbNamePlural];
  }

  config: any;

  showSearchBar: boolean = false;
  searchText: string;
  searchPlaceholder: string;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.items?.length,
    };

    this.showSearchBar = this.model?.searchFields?.length > 0;
    this.searchPlaceholder = this.model?.searchFields.join(', ');
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
    await this.ngOnInit();
    this.snackBar.open(this.model.name + ' ' + id + ' deleted.', null, {
      duration: 5000,
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
