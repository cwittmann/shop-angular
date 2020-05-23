import { Component } from '@angular/core';
import { StoreService } from './shared/service/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shop';

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.loadOrders();
  }
}
