import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Manufacturer } from 'src/app/shared/model/Manufacturer';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss'],
})
export class ManufacturerListComponent implements OnInit {
  newManufacturer: Manufacturer;
  showNew: boolean = false;

  get manufacturers(): Manufacturer[] {
    return this.storeService.manufacturers;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.newManufacturer = new Manufacturer(uuidv4(), 'New manufacturer');
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(manufacturer: Manufacturer) {
    await this.storeService.putManufacturer(manufacturer);
    this.storeService.reload();
    this.ngOnInit();
  }

  async saveNewInput(newManufacturer: Manufacturer) {
    await this.storeService.postManufacturer(newManufacturer);
    this.storeService.reload();
    this.ngOnInit();
    this.toggleNew();
  }

  async deleteInput(id: string) {
    await this.storeService.deleteManufacturer(id);
    this.storeService.reload();
    this.ngOnInit();
  }
}
