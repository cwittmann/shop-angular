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
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ManufacturerDetailComponent } from './component/manufacturer-detail/manufacturer-detail.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { RightDetailComponent } from './component/right-detail/right-detail.component';
import { RoleDetailComponent } from './component/role-detail/role-detail.component';
import { RoleRightDetailComponent } from './component/role-right-detail/role-right-detail.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { CategoryDetailComponent } from './component/category-detail/category-detail.component';

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
    path: 'order-detail',
    canActivate: [AuthGuardService],
    component: OrderDetailComponent,
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
    path: 'product-detail',
    canActivate: [AuthGuardService],
    component: ProductDetailComponent,
  },
  {
    path: 'product-detail/:id',
    canActivate: [AuthGuardService],
    component: ProductDetailComponent,
  },
  {
    path: 'category-list',
    canActivate: [AuthGuardService],
    component: CategoryListComponent,
  },
  {
    path: 'category-detail',
    canActivate: [AuthGuardService],
    component: CategoryDetailComponent,
  },
  {
    path: 'category-detail/:id',
    canActivate: [AuthGuardService],
    component: CategoryDetailComponent,
  },
  {
    path: 'manufacturer-list',
    canActivate: [AuthGuardService],
    component: ManufacturerListComponent,
  },
  {
    path: 'manufacturer-detail',
    canActivate: [AuthGuardService],
    component: ManufacturerDetailComponent,
  },
  {
    path: 'manufacturer-detail/:id',
    canActivate: [AuthGuardService],
    component: ManufacturerDetailComponent,
  },
  {
    path: 'user-list',
    canActivate: [AuthGuardService],
    component: UserListComponent,
  },
  {
    path: 'user-detail',
    canActivate: [AuthGuardService],
    component: UserDetailComponent,
  },
  {
    path: 'user-detail/:id',
    canActivate: [AuthGuardService],
    component: UserDetailComponent,
  },
  {
    path: 'right-list',
    canActivate: [AuthGuardService],
    component: RightListComponent,
  },
  {
    path: 'right-detail',
    canActivate: [AuthGuardService],
    component: RightDetailComponent,
  },
  {
    path: 'right-detail/:id',
    canActivate: [AuthGuardService],
    component: RightDetailComponent,
  },
  {
    path: 'role-list',
    canActivate: [AuthGuardService],
    component: RoleListComponent,
  },
  {
    path: 'role-detail',
    canActivate: [AuthGuardService],
    component: RoleDetailComponent,
  },
  {
    path: 'role-detail/:id',
    canActivate: [AuthGuardService],
    component: RoleDetailComponent,
  },
  {
    path: 'role-right-list',
    canActivate: [AuthGuardService],
    component: RoleRightListComponent,
  },
  {
    path: 'role-right-detail',
    canActivate: [AuthGuardService],
    component: RoleRightDetailComponent,
  },
  {
    path: 'role-right-detail/:id',
    canActivate: [AuthGuardService],
    component: RoleRightDetailComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '*', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
