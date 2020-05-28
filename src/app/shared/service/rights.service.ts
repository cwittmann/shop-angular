import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Permission } from '../enum/Permission';
import { Right } from '../model/Right';

@Injectable({
  providedIn: 'root',
})
export class RightsService {
  constructor(private storeService: StoreService) {}

  userHasRights(entity: string, permission: string) {
    let currentUser = this.storeService.currentUser;

    return currentUser.rights.some(
      (right) =>
        right.entity === entity &&
        Permission[right.permission] >= Permission[permission]
    );
  }
}
