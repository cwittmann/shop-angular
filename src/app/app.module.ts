import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
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
import { ListComponent } from './component/common/list/list.component';
import { LoginComponent } from './component/login/login.component';
import { ManufacturerDetailComponent } from './component/manufacturer-detail/manufacturer-detail.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { RightDetailComponent } from './component/right-detail/right-detail.component';
import { RoleDetailComponent } from './component/role-detail/role-detail.component';
import { RoleRightDetailComponent } from './component/role-right-detail/role-right-detail.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { EditComponent } from './component/common/edit/edit.component';
import { TitleComponent } from './component/common/title/title.component';
import { LinesComponent } from './component/common/lines/lines.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { CategoryDetailComponent } from './component/category-detail/category-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './shared/pipe/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafeHtmlPipe } from './shared/pipe/safe-html.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShopItemComponent } from './component/shop-item/shop-item.component';

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
    ManufacturerDetailComponent,
    ProductDetailComponent,
    RightDetailComponent,
    RoleDetailComponent,
    RoleRightDetailComponent,
    UserDetailComponent,
    EditComponent,
    TitleComponent,
    LinesComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    FilterPipe,
    SafeHtmlPipe,
    ShopItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MDBBootstrapModule.forRoot(),
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
