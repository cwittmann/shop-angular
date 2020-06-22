import { Type } from '@angular/core';

export class Column {
  public name: string;
  public displayName: string;
  public dataType: string;
  public isSecondary: boolean;
  public isEnum: boolean;
  isSortable: boolean;

  constructor(
    name: string,
    displayName: string,
    dataType: string,
    isSecondary: boolean = false,
    isEnum: boolean = false,
    isSortable: boolean = false
  ) {
    this.name = name;
    this.displayName = displayName;
    this.dataType = dataType;
    this.isSecondary = isSecondary;
    this.isEnum = isEnum;
    this.isSortable = isSortable;
  }
}
