import { BaseModel } from './BaseModel';
import { Role } from './Role';
import { Right } from './Right';

export class RoleRight extends BaseModel {
  public static dbNameSingular = 'roleRight';
  public static dbNamePlural = 'roleRights';
  public id: string;
  public roleId: string;
  public rightId: string;

  public role: Role;
  public right: Right;

  constructor(id: string, roleId: string, rightId: string) {
    super(id);
    this.roleId = roleId;
    this.rightId = rightId;
  }
}
