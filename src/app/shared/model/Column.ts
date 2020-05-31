import { Type } from '@angular/core';

export class Column {
  public name: string;
  public displayName: string;
  public dataType: string;

  constructor(name: string, displayName: string, dataType: string) {
    this.name = name;
    this.displayName = displayName;
    this.dataType = dataType;
  }
}
