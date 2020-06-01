import { BaseModel } from './BaseModel';
import { Manufacturer } from './Manufacturer';

export class Product extends BaseModel {
  public static dbName = 'products';
  public id: string;
  public name: string;
  public description: string;
  public price: string;
  public manufacturerId: string;
  public manufacturer: Manufacturer;

  constructor(
    id: string,
    name: string,
    description: string,
    price: string,
    manufacturerId: string,
    manufacturer: Manufacturer
  ) {
    super(id);
    this.name = name;
    this.description = description;
    this.price = price;
    this.manufacturerId = manufacturerId;
    this.manufacturer = manufacturer;
  }
}
