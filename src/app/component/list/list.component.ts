import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Manufacturer } from 'src/app/shared/model/Manufacturer';
import { v4 as uuidv4 } from 'uuid';
import { Column } from 'src/app/shared/model/Column';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input()
  itemType: string;

  @Input()
  columns: Column[];

  itemLink: any;

  get items(): any[] {
    return this.itemLink;
  }

  newItem: any;
  showNew: boolean = false;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    if (this.itemType === 'Manufacturer') {
      this.itemLink = this.storeService.manufacturers;
      this.newItem = new Manufacturer(uuidv4(), 'New manufacturer');
    }
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(item: any) {
    await this.storeService.putManufacturer(item);
    this.storeService.reload();
    this.ngOnInit();
  }

  async saveNewInput(newItem: any) {
    await this.storeService.postManufacturer(newItem);
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
