import { RightViewModel } from './RightViewModel';

export class RoleViewModel {
  public id: string;
  public name: string;

  public rights: RightViewModel[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
