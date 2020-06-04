import { BaseModel } from './BaseModel';
import { Right } from './Right';

export class Role extends BaseModel {
  public static dbNameSingular = 'role';
  public static dbNamePlural = 'roles';

  public id: string;
  public name: string;
  public rights: Right[];

  constructor(id: string, name: string, rights: Right[]) {
    super(id);
    this.name = name;
    this.rights = rights;
  }
}
