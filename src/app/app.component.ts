import { Component } from '@angular/core';
import { StoreService } from './shared/service/store.service';
import { User } from './shared/model/User';
import { AuthService } from './shared/service/auth.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1, transform: 'scale(1,1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0,0)' }),
        animate('1000ms cubic-bezier(0.680, -0.550, 0.265, 1.550)'),
      ]),
      transition(':leave', animate(100, style({ opacity: 0 }))),
    ]),
  ],
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
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout();
  }
}
