export class UserRightViewModel {
  public id: string;
  public userId: string;
  public rightId: string;

  constructor(id: string, userId: string, rightId: string) {
    this.id = id;
    this.userId = userId;
    this.rightId = rightId;
  }
}
