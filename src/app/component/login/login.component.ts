import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/shared/service/backend.service';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userName: string;
  userPassword: string;
  errors: string[];

  constructor(
    private authService: AuthService,
    private backendService: BackendService,
    private storeService: StoreService,
    private router: Router
  ) {
    this.backendService.userAuthenticated.subscribe(async () => {
      await this.authService.setUserInfo({ user: this.userName });
      await this.storeService.initialize(this.userName);
      this.router.navigate(['/shop']);
      this.storeService.loading = false;
    });
    this.backendService.authenticationFailed.subscribe(async () => {
      this.errors = ["User name and password don't match."];
      this.storeService.loading = false;
    });
  }

  ngOnInit(): void {}

  login() {
    this.errors = [];
    if (this.userName === undefined || this.userName.length < 1) {
      this.errors.push('User name is missing.');
    }
    if (this.userPassword === undefined || this.userPassword.length < 1) {
      this.errors.push('Password is missing.');
    }
    if (this.errors.length > 0) {
      return;
    }

    this.storeService.loading = true;
    this.authService.validate(this.userName, this.userPassword);
  }
}
