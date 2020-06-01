import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Product } from 'src/app/shared/model/Product';
import { v4 as uuidv4 } from 'uuid';
import { Manufacturer } from 'src/app/shared/model/Manufacturer';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  newProduct: Product;
  showNew: boolean = false;

  get products(): Product[] {
    return this.storeService.products;
  }

  get manufacturers(): Manufacturer[] {
    return this.storeService.manufacturers;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.newProduct = new Product(
      uuidv4(),
      'Name',
      'Description',
      '0.00',
      null
    );
  }

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(product: Product) {
    await this.storeService.putProduct(product);
    this.storeService.reload();
    this.ngOnInit();
  }

  async saveNewInput(newProduct: Product) {
    await this.storeService.postProduct(newProduct);
    this.storeService.reload();
    this.ngOnInit();
    this.toggleNew();
  }

  async deleteInput(id: string) {
    await this.storeService.deleteProduct(id);
    this.storeService.reload();
    this.ngOnInit();
  }

  setManufacturer(product: Product, event) {
    let manufacturerId = event.target.value;
    let manufacturer = this.storeService.manufacturers.find(
      (manufacturer) => manufacturer.id === manufacturerId
    );
    product.manufacturer = manufacturer;
  }
}
