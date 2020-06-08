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
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private backendService: BackendService,
    private storeService: StoreService,
    private router: Router
  ) {
    this.backendService.userAuthenticated.subscribe(() => {
      this.authService.setUserInfo({ user: this.userName });
      this.storeService.initialize(this.userName);
      this.router.navigate(['/shop']);
    });
  }

  ngOnInit(): void {}

  login() {
    this.authService.validate(this.userName, this.userPassword);
  }
}
