import { BaseModel } from './BaseModel';

export class Product extends BaseModel {
  public static dbName = 'products';
  public id: string;
  public manufacturerId: string;
  public name: string;
  public description: string;
  public price: string;

  constructor(
    id: string,
    manufacturerId: string,
    name: string,
    description: string,
    price: string
  ) {
    super(id);
    this.manufacturerId = manufacturerId;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
