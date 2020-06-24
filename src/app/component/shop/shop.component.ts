import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Product } from 'src/app/shared/model/Product';
import { v4 as uuidv4 } from 'uuid';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';
import { OrderLine } from 'src/app/shared/model/OrderLine';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/model/Category';
import {
  trigger,
  state,
  transition,
  animate,
  style,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [
    trigger('fadeLeft', [
      state('in', style({ opacity: 1, transform: 'translate(0, 0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translate(1000px, 0)' }),
        animate('800ms cubic-bezier(0.680, -0.550, 0.265, 1.550)'),
      ]),
      transition(':leave', animate(100, style({ opacity: 0 }))),
    ]),

    trigger('highlight', [
      state(
        'highlight',
        style({
          transform: 'scale(0.8,0.8)',
          backgroundColor: '#4788c7',
          color: 'white',
        })
      ),
      state('rest', style({ transform: 'scale(1,1)' })),
      transition('rest <=> highlight', [
        animate('200ms cubic-bezier(0.680, -0.550, 0.265, 1.550)'),
      ]),
    ]),
  ],
})
export class ShopComponent implements OnInit {
  numbers: Number[] = [1, 2, 3];

  @ViewChildren('linkRef') linkRefs;

  selectedCategory: Category;
  selectedProduct: Product;

  get products(): Product[] {
    return this.getProducts();
  }

  get categories(): Category[] {
    return this.storeService.categories;
  }

  get shoppingCart(): OrderViewModel {
    return this.storeService.shoppingCart;
  }

  showDetails: boolean = false;
  isUpdating: boolean = false;
  updatingProduct: Product;

  constructor(
    private storeService: StoreService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    let categoryId = activateRoute.snapshot.params['id'];
    if (categoryId) {
      this.selectedCategory = this.storeService.categories.find(
        (category) => category.id === categoryId
      );
    }

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {}

  toggleDetails(product: Product = null) {
    if (!this.showDetails) {
      this.selectedProduct = product;
    }
    this.showDetails = !this.showDetails;
  }

  getProducts(): Product[] {
    if (this.selectedCategory) {
      return this.storeService.products.filter(
        (product) => product.categoryId === this.selectedCategory.id
      );
    } else {
      return this.storeService.products;
    }
  }

  selectCategory(category: Category = null) {
    if (!category) {
      this.router.navigate(['/shop']);
      return;
    }

    let selectedCategoryid = category;
    this.router.navigate(['/shop/', selectedCategoryid]);
  }
}
