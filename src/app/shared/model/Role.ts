import { BaseModel } from './BaseModel';

export class Role extends BaseModel {
  public static dbName = 'roles';

  public id: string;
  public name: string;

  constructor(id: string, name: string) {
    super(id);
    this.name = name;
  }
}
