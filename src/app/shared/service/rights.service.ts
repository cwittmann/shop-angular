import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Permission } from '../enum/Permission';

@Injectable({
  providedIn: 'root',
})
export class RightsService {
  constructor(private storeService: StoreService) {}

  userHasRights(entity: string, permission: string) {
    let currentUser = this.storeService.currentUser;
    //console.log(currentUser.role);
    //console.log('Check ' + entity + permission);
    let result = currentUser.role.rights.some(
      (right) =>
        right.entity === entity &&
        Permission[right.permission] >= Permission[permission]
    );
    //console.log(result);
    return result;
  }
}
