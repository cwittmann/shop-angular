import { Component, OnInit, ViewChildren } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';
import { Product } from 'src/app/shared/model/Product';
import { v4 as uuidv4 } from 'uuid';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';
import { OrderLine } from 'src/app/shared/model/OrderLine';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/model/Category';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  numbers: Number[] = [1, 2, 3];

  @ViewChildren('linkRef') linkRefs;

  selectedCategory: Category;

  get products(): Product[] {
    return this.getProducts();
  }

  get categories(): Category[] {
    return this.storeService.categories;
  }

  get shoppingCart(): OrderViewModel {
    return this.storeService.shoppingCart;
  }

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

  getAmount(productId: string) {
    return this.shoppingCart.orderLines.find(
      (orderLine) => orderLine.product.id === productId
    ).amount;
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
}
