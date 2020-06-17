import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Permission } from '../enum/Permission';

@Injectable({
  providedIn: 'root',
})
export class RightsService {
  constructor(private storeService: StoreService) {}

  userHasRights(entity: string, permission: string): boolean {
    if (
      !entity ||
      entity.length === 0 ||
      !permission ||
      permission.length === 0
    ) {
      return false;
    }

    let currentUser = this.storeService.currentUser;

    let result = currentUser?.role?.rights.some(
      (right) =>
        right.entity === entity &&
        Permission[right.permission] >= Permission[permission]
    );
    return result;
  }
}
