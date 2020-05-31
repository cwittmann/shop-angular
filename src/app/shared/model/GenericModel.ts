export interface IGenericModel<T> {
  new (...args: any[]): T;
  name: string;
  dbName: string;
}
