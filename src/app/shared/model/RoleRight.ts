import { BaseModel } from './BaseModel';

export class RoleRight extends BaseModel {
  public static dbName = 'roleRights';
  public id: string;
  public roleId: string;
  public rightId: string;

  constructor(id: string, roleId: string, rightId: string) {
    super(id);
    this.roleId = roleId;
    this.rightId = rightId;
  }
}
