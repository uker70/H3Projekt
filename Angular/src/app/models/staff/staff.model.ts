import { User } from '../user/user.model';

export class Staff {
  id: number; // Autoincrement ID.
  user: User; // Contains login credentials.
  name: string; // nvchar(15);
  phoneNumber: string; // nvchar(15);

  constructor() {
    this.user = new User();
  }

  public isValid(): boolean {
    return this.id && this.name && this.phoneNumber && this.user.isValid();
  }
}