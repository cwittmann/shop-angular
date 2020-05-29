export class RoleRight {
  public id: string;
  public roleId: string;
  public rightId: string;

  constructor(id: string, roleId: string, rightId: string) {
    this.id = id;
    this.roleId = roleId;
    this.rightId = rightId;
  }
}
