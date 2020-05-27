import { Component } from '@angular/core';
import { StoreService } from './shared/service/store.service';
import { User } from './shared/model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shop';

  get currentUser(): User {
    return this.storeService.currentUser;
  }

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.initialize();
  }

  changeUser() {
    this.storeService.loadUser();
  }
}
