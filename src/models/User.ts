import { CustomerPermissoin, UserType } from "../types/user";

/**
 * Abstract Class for all users types
 * -Cannot be Instantiated
 */
export abstract class User {
  protected readonly userId: number;
  private static _nextUserId: number = 1;

  constructor(protected _name: string, protected _email: string) {
    this.userId = User._nextUserId++;
  }

  // METHODS
  abstract getRole(): UserType;
  abstract getPermissions(): CustomerPermissoin[];

  // Concreate method -shared by all subclasses
  public getInfo(): string {
    return `${this._name} (${this._email}) ${this.getRole()}`;
  }

  // Getters
  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  // Setters
  set name(newName: string) {
    if (!newName || newName.trim().length === 0) {
      throw new Error("name cannot be empty");
    }
    if (newName.trim().length < 2) {
      throw new Error("Name must be at least 2 charcters long!");
    }
    this._name = newName.trim();
  }
  set email(newEmail: string) {
    if (!newEmail || !this.isValidEmail(newEmail)) {
      if (!newEmail) throw Error("Email is requerd ");
      throw Error("Invalid Email Format");
    } else {
      this._email = newEmail.toLowerCase().trim();
    }
  }

  /**
   * Private helper method to validate emal format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
