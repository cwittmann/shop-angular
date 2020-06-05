import { BaseModel } from './BaseModel';

export class Right extends BaseModel {
  public static dbNameSingular = 'right';
  public static dbNamePlural = 'rights';
  public static route = 'right';
  public id: string;
  public entity: string;
  public permission: string;

  public name: string;

  constructor(id: string, entity: string, permission: string) {
    super(id);
    this.entity = entity;
    this.permission = permission;
  }
}
