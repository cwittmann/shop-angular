import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './service/store.service';
import { BackendService } from './service/backend.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [StoreService, BackendService],
})
export class SharedModule {}
