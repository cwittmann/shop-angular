import { BaseModel } from './BaseModel';
import { Role } from './Role';

export class User extends BaseModel {
  public static dbName = 'users';

  public id: string;
  public firstName: string;
  public lastName: string;
  public city: string;
  public role: Role;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    city: string,
    role: Role
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.role = role;
  }
}
