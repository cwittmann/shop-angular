import { Manufacturer } from './Manufacturer';

export class ProductViewModel {
  public id: string;
  public manufacturerId: string;
  public name: string;
  public description: string;
  public price: string;

  public manufacturer: Manufacturer;

  constructor(
    id: string,
    name: string,
    description: string,
    price: string,
    manufacturer: Manufacturer
  ) {
    this.id = id;
    this.manufacturerId = manufacturer.id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.manufacturer = manufacturer;
  }
}
