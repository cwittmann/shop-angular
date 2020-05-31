import { BaseModel } from './BaseModel';

export class Manufacturer extends BaseModel {
  public static dbName = 'manufacturers';
  public id: string;
  public name: string;

  constructor(id: string, name: string) {
    super(id);
    this.name = name;
  }
}
