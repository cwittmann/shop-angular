import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ManufacturerListComponent } from './component/manufacturer-list/manufacturer-list.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { ShopComponent } from './component/shop/shop.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RightsPipe } from './shared/pipe/rights.pipe';
import { RightListComponent } from './component/right-list/right-list.component';
import { RoleRightListComponent } from './component/role-right-list/role-right-list.component';
import { RoleListComponent } from './component/role-list/role-list.component';
import { ListComponent } from './component/list/list.component';
import { LoginComponent } from './component/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    OrderDetailComponent,
    ProductListComponent,
    ManufacturerListComponent,
    UserListComponent,
    ShopComponent,
    CheckoutComponent,
    RightsPipe,
    RightListComponent,
    RoleRightListComponent,
    RoleListComponent,
    ListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
