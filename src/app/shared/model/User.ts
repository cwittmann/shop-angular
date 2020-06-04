import { BaseModel } from './BaseModel';
import { Role } from './Role';

export class User extends BaseModel {
  public static dbNameSingular = 'user';
  public static dbNamePlural = 'users';

  public id: string;
  public firstName: string;
  public lastName: string;
  public city: string;
  public roleId: string;
  public role: Role;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    city: string,
    roleId: string,
    role: Role
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.roleId = roleId;
    this.role = role;
  }
}
