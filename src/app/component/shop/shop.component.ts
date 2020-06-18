import { Component, OnInit, ViewChildren } from '@angular/core';
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
} from '@angular/animations';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1, transform: 'scale(1,1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0,0)' }),
        animate('400ms cubic-bezier(0.680, -0.550, 0.265, 1.550)'),
      ]),
      transition(':leave', animate(100, style({ opacity: 0 }))),
    ]),

    trigger('rotate', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'rotateY(0deg)',
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'rotateY(180deg)',
        }),
        animate('400ms cubic-bezier(0.680, -0.550, 0.265, 1.550)'),
      ]),
      transition(':leave', animate(100, style({ opacity: 0 }))),
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

  isInOrder(productId: string) {
    return this.shoppingCart.orderLines.some(
      (orderLine) => orderLine.product.id === productId
    );
  }

  addToCart(product: Product) {
    let amount = this.linkRefs.find(
      (linkRef) => linkRef.nativeElement.id === product.id
    ).nativeElement.value;

    if (
      !this.shoppingCart.orderLines.find(
        (orderLine) => orderLine.product.id === product.id
      )
    ) {
      let orderLine: OrderLine = new OrderLine(
        uuidv4(),
        this.shoppingCart.id,
        amount,
        product
      );
      this.shoppingCart.orderLines.push(orderLine);

      if (this.showDetails) {
        this.toggleDetails();
      }
    }
  }

  removeFromCart(product: Product) {
    let orderLineWithProduct = this.shoppingCart.orderLines.find(
      (orderLine) => orderLine.product.id === product.id
    );

    this.shoppingCart.orderLines.splice(
      this.shoppingCart.orderLines.indexOf(orderLineWithProduct),
      1
    );
  }

  selectAmount(number: number, productId: string): boolean {
    let orderLine = this.shoppingCart.orderLines.find(
      (orderLine) => orderLine.product.id === productId
    );
    if (!orderLine) {
      return false;
    }

    return orderLine?.amount == number;
  }

  getImage(id: string) {
    let result = this.storeService.images.find((image) => image.id === id);
    return result.data;
  }
}
