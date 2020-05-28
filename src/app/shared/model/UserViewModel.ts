import { Right } from './Right';

export class UserViewModel {
  public id: string;
  public firstName: string;
  public lastName: string;
  public city: string;

  public rights: Right[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    city: string,
    rights: Right[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.rights = rights;
  }
}
