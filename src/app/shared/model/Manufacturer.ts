import { BaseModel } from './BaseModel';

export class Manufacturer extends BaseModel {
  public static dbNameSingular = 'manufacturer';
  public static dbNamePlural = 'manufacturers';
  public id: string;
  public name: string;

  constructor(id: string, name: string) {
    super(id);
    this.name = name;
  }
}
