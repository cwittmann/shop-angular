import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Router } from '@angular/router';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private backendService: BackendService,
    private storeService: StoreService,
    private router: Router
  ) {}

  public isAuthenticated(): Boolean {
    let userId = localStorage.getItem('userId');
    if (userId && JSON.parse(userId)) {
      return true;
    }
    return false;
  }

  public logout() {
    this.storeService.currentUser = null;
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  public setUserInfo(userId) {
    localStorage.setItem('userId', JSON.stringify(userId));
  }

  public async validate(user, password) {
    this.backendService.authenticate(user, password);
  }
}
