import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './component/order-list/order-list.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ManufacturerListComponent } from './component/manufacturer-list/manufacturer-list.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { ShopComponent } from './component/shop/shop.component';

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'order-detail/:id', component: OrderDetailComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'manufacturer-list', component: ManufacturerListComponent },
  { path: 'user-list', component: UserListComponent },
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: '*', redirectTo: 'shop', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
