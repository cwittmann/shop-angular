import {
  Component,
  OnInit,
  ViewChildren,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  trigger,
  state,
  transition,
  animate,
  style,
  keyframes,
} from '@angular/animations';
import { Category } from 'src/app/shared/model/Category';
import { Product } from 'src/app/shared/model/Product';
import { StoreService } from 'src/app/shared/service/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderViewModel } from 'src/app/shared/model/OrderViewModel';
import { v4 as uuidv4 } from 'uuid';
import { OrderLine } from 'src/app/shared/model/OrderLine';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1, transform: 'scale(1,1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0,0)' }),
        animate('400ms cubic-bezier(0.680, -0.550, 0.265, 1.550)'),
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

    trigger('rotate', [
      state(
        'rest',
        style({
          opacity: 1,
          transform: 'rotateY(0deg)',
        })
      ),
      transition('move => rest', [
        style({
          opacity: 1,
          transform: 'rotateY(15deg)',
        }),
        animate(
          '800ms cubic-bezier(0.680, -0.550, 0.265, 1.550)',
          keyframes([
            style({
              transform: 'rotateY(0deg)',
            }),
            style({
              transform: 'rotateY(360deg)',
            }),
            style({
              transform: 'rotateY(0deg)',
            }),
            style({
              transform: 'rotateY(90deg)',
            }),
            style({
              transform: 'rotateY(0deg)',
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class ShopItemComponent implements OnInit {
  @ViewChildren('linkRef') linkRefs;

  @Input()
  product: Product;

  @Input()
  selectedProduct: Product;

  @Input()
  index: number;

  @Output()
  selectedProductChanged = new EventEmitter<Product>();

  numbers: Number[] = [1, 2, 3];

  get shoppingCart(): OrderViewModel {
    return this.storeService.shoppingCart;
  }

  isUpdating: boolean = false;
  updatingProduct: Product;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}

  showDetails(product: Product) {
    if (!this.selectedProduct) {
      this.selectedProductChanged.emit(product);
    }
  }

  closeDetails() {
    this.selectedProductChanged.emit(null);
  }

  isInOrder(productId: string) {
    return this.shoppingCart.orderLines.some(
      (orderLine) => orderLine.product.id === productId
    );
  }

  addToCart(product: Product) {
    this.isUpdating = true;
    this.updatingProduct = product;

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

    setTimeout(() => {
      this.isUpdating = false;
      this.updatingProduct = null;
    }, 400);
  }

  removeFromCart(product: Product) {
    this.isUpdating = true;
    this.updatingProduct = product;

    let orderLineWithProduct = this.shoppingCart.orderLines.find(
      (orderLine) => orderLine.product.id === product.id
    );

    this.shoppingCart.orderLines.splice(
      this.shoppingCart.orderLines.indexOf(orderLineWithProduct),
      1
    );
    setTimeout(() => {
      this.isUpdating = false;
      this.updatingProduct = null;
    }, 400);
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
