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

  constructor(private storeService: StoreService) {
    this.newProduct = new Product(
      uuidv4(),
      null,
      'Name',
      'Description',
      '0.00'
    );
  }

  ngOnInit(): void {}

  toggleNew() {
    this.showNew = !this.showNew;
  }

  async saveEditedInput(product: Product) {
    await this.storeService.putProduct(product);
    window.location.reload();
  }

  async saveNewInput(newProduct: Product) {
    await this.storeService.postProduct(newProduct);
    window.location.reload();
  }

  async deleteInput(id: string) {
    await this.storeService.deleteProduct(id);
    window.location.reload();
  }
}
