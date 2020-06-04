import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './component/order-list/order-list.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ManufacturerListComponent } from './component/manufacturer-list/manufacturer-list.component';
import { ShopComponent } from './component/shop/shop.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { RightListComponent } from './component/right-list/right-list.component';
import { RoleRightListComponent } from './component/role-right-list/role-right-list.component';
import { RoleListComponent } from './component/role-list/role-list.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuardService } from './shared/service/auth-guard.service';
import { UserListComponent } from './component/user-list/user-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'shop', canActivate: [AuthGuardService], component: ShopComponent },
  {
    path: 'checkout',
    canActivate: [AuthGuardService],
    component: CheckoutComponent,
  },
  {
    path: 'order-list',
    canActivate: [AuthGuardService],
    component: OrderListComponent,
  },
  {
    path: 'order-detail/:id',
    canActivate: [AuthGuardService],
    component: OrderDetailComponent,
  },
  {
    path: 'product-list',
    canActivate: [AuthGuardService],
    component: ProductListComponent,
  },
  {
    path: 'manufacturer-list',
    canActivate: [AuthGuardService],
    component: ManufacturerListComponent,
  },
  {
    path: 'user-list',
    canActivate: [AuthGuardService],
    component: UserListComponent,
  },
  {
    path: 'right-list',
    canActivate: [AuthGuardService],
    component: RightListComponent,
  },
  {
    path: 'role-list',
    canActivate: [AuthGuardService],
    component: RoleListComponent,
  },
  {
    path: 'role-right-list',
    canActivate: [AuthGuardService],
    component: RoleRightListComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '*', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
