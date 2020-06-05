export interface IGenericModel<T> {
  new (...args: any[]): T;
  name: string;
  dbNameSingular: string;
  dbNamePlural: string;
  route: string;
}
