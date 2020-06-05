import { Type } from '@angular/core';

export class Column {
  public name: string;
  public displayName: string;
  public dataType: string;
  public secondary: boolean;

  constructor(
    name: string,
    displayName: string,
    dataType: string,
    secondary: boolean = false
  ) {
    this.name = name;
    this.displayName = displayName;
    this.dataType = dataType;
    this.secondary = secondary;
  }
}
