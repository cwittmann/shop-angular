import { BaseModel } from './BaseModel';

export class User extends BaseModel {
  public static dbName = 'users';

  public id: string;
  public firstName: string;
  public lastName: string;
  public city: string;
  public roleId: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    city: string,
    roleId: string
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.roleId = roleId;
  }
}
