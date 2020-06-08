import { BaseModel } from './BaseModel';

export class Category extends BaseModel {
  public static dbNameSingular = 'category';
  public static dbNamePlural = 'categories';
  public static route = 'category';

  public id: string;
  public name: string;

  constructor(id: string, name: string) {
    super(id);
    this.name = name;
  }
}
