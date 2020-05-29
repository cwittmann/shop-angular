import { Component } from '@angular/core';
import { StoreService } from './shared/service/store.service';
import { UserViewModel } from './shared/model/UserViewModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shop';
  finishedLoading: boolean = false;

  get currentUser(): UserViewModel {
    return this.storeService.currentUser;
  }

  constructor(private storeService: StoreService) {}

  async ngOnInit(): Promise<void> {
    await this.storeService.initialize();
    this.finishedLoading = true;
  }
}
