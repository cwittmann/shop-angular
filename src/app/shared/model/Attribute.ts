import { BaseModel } from './BaseModel';

export class Attribute extends BaseModel {
  public static dbNameSingular = 'attribute';
  public static dbNamePlural = 'attributes';
  public static route = 'attribute';

  public id: string;
  public name: string;
  public value: string;

  constructor(id: string, name: string, value: string) {
    super(id);
    this.name = name;
    this.value = value;
  }
}
