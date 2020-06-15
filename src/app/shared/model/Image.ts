import { BaseModel } from './BaseModel';

export class Image extends BaseModel {
  public id: string;
  public data: any;

  constructor(id: string, data: any) {
    super(id);
    this.data = data;
  }
}
