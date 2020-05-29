import { RoleViewModel } from './RoleViewModel';

export class UserViewModel {
  public id: string;
  public firstName: string;
  public lastName: string;
  public city: string;
  public roleId: string;

  public role: RoleViewModel;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    city: string,
    roleId: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.roleId = roleId;
  }
}
