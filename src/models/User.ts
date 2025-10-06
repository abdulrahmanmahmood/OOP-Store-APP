/**
 * Abstract Class for all users types
 * -Cannot be Instantiated
 */
abstract class User {
  private static _nextUserId: number = 1;

  constructor(
    protected readonly userId: string,
    protected _name: string,
    protected _email: string
  ) {}

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
}
