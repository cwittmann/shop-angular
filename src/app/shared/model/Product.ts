export class Product {
  public id: string;
  public manufacturerId: string;
  public name: string;
  public description: string;
  public price: string;

  public Product(
    id: string,
    manufacturerId: string,
    name: string,
    description: string,
    price: string
  ) {
    this.id = id;
    this.manufacturerId = manufacturerId;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
