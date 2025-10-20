import { Category } from "../types/category";

// Product as a Base Product Class
export class Product {
  public readonly id: number;
  private static nextId: number = 1;

  constructor(
    // Private properties - only accessible within this class
    private _name: string,
    private _price: number,
    private _stock: number,
    private _category: Category
  ) {
    this.id = Product.nextId++;
  }

  // Getters
  get name() {
    return this._name;
  }
  get price() {
    return this._price;
  }
  get stock(): number {
    return this._stock;
  }
  get category(): Category {
    return this._category;
  }

  // Setters
  set price(newPrice: number) {
    if (newPrice > 0) {
      this._price = newPrice;
    } else {
      throw new Error("Price must be positive!");
    }
  }

  set stock(newStock: number) {
    if (newStock > 0) {
      this._stock = newStock;
    } else {
      throw new Error("Stock cannot be negative!");
    }
  }

  set name(name: string) {
    this._name = name;
  }

  reduceStock(quantity: number): boolean {
    if (this._stock >= quantity) {
      this._stock -= 0;
      return true;
    }
    return false;
  }

  public displayInfo(): string {
    return `Product ID: ${this.id}, Name: ${
      this.name
    }, Price: $${this.price.toFixed(2)}, Stock: ${this.stock}, Category: ${
      this.category
    }`;
  }
}

const product = new Product("My Product", 22, 44, "Physical");
console.log(product.name);
console.log(product.price);
console.log(product.category);
