import { BaseModel } from './BaseModel';
import { Role } from './Role';

export class User extends BaseModel {
  public static dbNameSingular = 'user';
  public static dbNamePlural = 'users';
  public static route = 'user';

  public id: string;
  public firstName: string;
  public lastName: string;
  public city: string;
  public userName: string;
  public password: string;
  public roleId: string;
  public role: Role;

  public name: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    city: string,
    userName: string,
    password: string,
    roleId: string,
    role: Role
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.userName = userName;
    this.password = password;
    this.roleId = roleId;
    this.role = role;
  }
}
