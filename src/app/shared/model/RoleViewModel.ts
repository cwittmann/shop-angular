import { Role } from './Role';
import { Right } from './Right';

export class RoleViewModel extends Role {
  public rights: Right[];
}
