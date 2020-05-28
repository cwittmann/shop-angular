import { Pipe, PipeTransform } from '@angular/core';
import { RightsService } from '../service/rights.service';

@Pipe({
  name: 'rights',
})
export class RightsPipe implements PipeTransform {
  constructor(private rightsService: RightsService) {}

  transform(value: string[], ...args: unknown[]): boolean {
    return this.rightsService.userHasRights(value[0], value[1]);
  }
}
