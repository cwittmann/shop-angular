import { BaseModel } from './BaseModel';

export class Right extends BaseModel {
  public static dbName = 'rights';
  public id: string;
  public entity: string;
  public permission: string;

  constructor(id: string, entity: string, permission: string) {
    super(id);
    this.entity = entity;
    this.permission = permission;
  }
}
