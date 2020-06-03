import { Component } from '@angular/core';
import { StoreService } from './shared/service/store.service';
import { User } from './shared/model/User';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shop';
  get loading(): boolean {
    return this.storeService.loading;
  }

  get currentUser(): User {
    return this.storeService.currentUser;
  }

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {}

  logout() {
    this.authService.logout();
  }
}
