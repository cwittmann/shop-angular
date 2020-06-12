import { BaseModel } from './BaseModel';
import { Manufacturer } from './Manufacturer';
import { Category } from './Category';
import { Attribute } from './Attribute';

export class Product extends BaseModel {
  public static dbNameSingular = 'product';
  public static dbNamePlural = 'products';
  public static route = 'product';
  public id: string;
  public name: string;
  public description: string;
  public price: string;
  public categoryId: string;
  public category: Category;
  public manufacturerId: string;
  public manufacturer: Manufacturer;
  public attributes: Attribute[];

  constructor(
    id: string,
    name: string,
    description: string,
    price: string,
    categoryId: string,
    category: Category,
    manufacturerId: string,
    manufacturer: Manufacturer,
    attributes: Attribute[]
  ) {
    super(id);
    this.name = name;
    this.description = description;
    this.price = price;
    this.categoryId = categoryId;
    this.category = category;
    this.manufacturerId = manufacturerId;
    this.manufacturer = manufacturer;
    this.attributes = attributes;
  }
}
