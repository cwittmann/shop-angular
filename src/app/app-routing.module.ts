import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './component/order-list/order-list.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ManufacturerListComponent } from './component/manufacturer-list/manufacturer-list.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { ShopComponent } from './component/shop/shop.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { RightListComponent } from './component/right-list/right-list.component';
import { RoleRightListComponent } from './component/role-right-list/role-right-list.component';
import { RoleListComponent } from './component/role-list/role-list.component';

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'order-detail/:id', component: OrderDetailComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'manufacturer-list', component: ManufacturerListComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'right-list', component: RightListComponent },
  { path: 'role-list', component: RoleListComponent },
  { path: 'role-right-list', component: RoleRightListComponent },
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: '*', redirectTo: 'shop', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
