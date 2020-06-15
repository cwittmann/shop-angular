import { Pipe, PipeTransform } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => item.name.toLowerCase().includes(searchText));
  }
}
