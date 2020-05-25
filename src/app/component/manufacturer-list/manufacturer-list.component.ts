import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Manufacturer } from 'src/app/shared/model/Manufacturer';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss'],
})
export class ManufacturerListComponent implements OnInit {
  get manufacturers(): Manufacturer[] {
    return this.storeService.manufacturers;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}
}
