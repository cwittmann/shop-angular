export class Right {
  public id: string;
  public entity: string;
  public permission: string;

  constructor(id: string, entity: string, permission: string) {
    this.id = id;
    this.entity = entity;
    this.permission = permission;
  }
}
