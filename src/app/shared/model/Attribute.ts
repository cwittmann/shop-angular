import { BaseModel } from './BaseModel';

export class Attribute extends BaseModel {
  public static dbNameSingular = 'attribute';
  public static dbNamePlural = 'attributes';
  public static route = 'attribute';
  public static searchFields = ['name', 'value'];

  public id: string;
  public productId: string;
  public name: string;
  public value: string;

  constructor(id: string, productId: string, name: string, value: string) {
    super(id);
    this.productId = productId;
    this.name = name;
    this.value = value;
  }
}
