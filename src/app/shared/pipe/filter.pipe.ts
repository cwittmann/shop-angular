import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, searchFields: string[]): any[] {
    if (!items) {
      return [];
    }

    if (
      !searchText ||
      searchText.length === 0 ||
      !searchFields ||
      searchFields.length === 0
    ) {
      return items;
    }

    searchText = searchText.toLowerCase();

    let filteredItems = [];

    for (let searchField of searchFields) {
      let itemsWithMatchingSearchField = items.filter((item) =>
        item[searchField]?.toLowerCase().includes(searchText)
      );

      for (let item of itemsWithMatchingSearchField) {
        filteredItems.push(item);
      }
    }

    return filteredItems;
  }
}
