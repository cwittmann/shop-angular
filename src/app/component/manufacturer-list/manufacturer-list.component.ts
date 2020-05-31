import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/shared/model/Column';
import { IGenericModel } from 'src/app/shared/model/GenericModel';
import { Manufacturer } from 'src/app/shared/model/Manufacturer';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss'],
})
export class ManufacturerListComponent implements OnInit {
  genericModel: IGenericModel<any>;
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.genericModel = Manufacturer;
    this.columns = [new Column('name', 'Name', 'text')];
  }
}
