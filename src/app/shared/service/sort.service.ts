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
      if (item1[attribute] == item2[attribute]) {
        continue;
      }
      if (
        (item1[attribute] > item2[attribute] && orderByDescending) ||
        (item1[attribute] < item2[attribute] && !orderByDescending)
      ) {
        return true;
      }
      if (
        (item1[attribute] < item2[attribute] && orderByDescending) ||
        (item1[attribute] > item2[attribute] && !orderByDescending)
      ) {
        return false;
      }
    }
  }
}
