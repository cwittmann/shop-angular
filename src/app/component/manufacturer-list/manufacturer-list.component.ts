import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/shared/model/Column';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss'],
})
export class ManufacturerListComponent implements OnInit {
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.columns = [
      new Column('name', 'Name', 'text'),
      new Column('foundationDate', 'Foundation Date', 'date'),
    ];
  }
}
