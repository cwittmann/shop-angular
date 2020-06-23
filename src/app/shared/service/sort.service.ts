import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}

  sortByAttributes(
    items: any[],
    attributes: string[],
    orderByDescending: boolean
  ) {
    return items.sort((item1, item2) =>
      this.compareAttributes(item1, item2, attributes, orderByDescending)
        ? 1
        : -1
    );
  }

  private compareAttributes(
    item1: any,
    item2: any,
    attributes: string[],
    orderByDescending: boolean
  ): boolean {
    for (let attribute of attributes) {
      let attribute1 = item1[attribute];
      let attribute2 = item2[attribute];

      if (attribute1 == attribute2) {
        continue;
      }

      if (attribute == 'price') {
        attribute1 = parseFloat(attribute1);
        attribute2 = parseFloat(attribute2);
      }

      if (
        (attribute1 > attribute2 && orderByDescending) ||
        (attribute1 < attribute2 && !orderByDescending)
      ) {
        return true;
      }
      if (
        (attribute1 < attribute2 && orderByDescending) ||
        (attribute1 > attribute2 && !orderByDescending)
      ) {
        return false;
      }
    }
  }
}
