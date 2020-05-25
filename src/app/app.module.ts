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

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    OrderDetailComponent,
    ProductListComponent,
    ManufacturerListComponent,
    UserListComponent,
    ShopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
