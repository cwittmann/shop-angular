import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Manufacturer } from 'src/app/shared/model/Manufacturer';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

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

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit(): void {
    this.newManufacturer = new Manufacturer(uuidv4(), 'New manufacturer');
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(manufacturer: Manufacturer) {
    await this.storeService.putManufacturer(manufacturer);
    window.location.reload();
  }

  async saveNewInput(newManufacturer: Manufacturer) {
    await this.storeService.postManufacturer(newManufacturer);
    window.location.reload();
  }

  async deleteInput(id: string) {
    await this.storeService.deleteManufacturer(id);
    window.location.reload();
  }
}
