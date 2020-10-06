export class User {
  id: number; // Integer auto increment value.
  username: string; // nvchar(50)
  password: string; // nvchar(50)
  //userLevel: number; // Security level.
  userLevel: UserLevel

  public isValid() {
    return this.id && this.username && this.password && this.userLevel > 0 && this.userLevel <= 1;
  }
}

export enum UserLevel {
  Administrator = 0,
  Guard = 1,
}