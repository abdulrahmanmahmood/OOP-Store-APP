import { Product } from "./Product";

export class PhysicalProduct extends Product {
  constructor(
    name: string,
    price: number,
    stock: number,
    private _weight: number,
    private _dimensions: string
  ) {
    super(name, price, stock, "Physical");

    if (_weight <= 0) {
      throw new Error("Weight must be a positive number.");
    }
    if (_dimensions.trim().length === 0 || !_dimensions) {
      throw new Error("Dimensions cannot be empty.");
    }
    this._weight = _weight;
    this._dimensions = _dimensions.trim();
  }
}
