import { AdminPermission, CustomerPermissoin, UserType } from "../types/user";
import { DigitalProduct } from "./DigitalProduct";
import { PhysicalProduct } from "./PhysicalProduct";
import { User } from "./User";

export class Admin extends User {
  private readonly managedProducts: (DigitalProduct | PhysicalProduct)[] = [];
  constructor(name: string, email: string) {
    super(name, email);
  }
  getRole(): UserType {
    return "Admin";
  }

  getPermissions(): AdminPermission[] {
    return ["manage_orders", "manage_products", "manage_store", "manage_users"];
  }

  public addPhysicalProduct(
    name: string,
    price: number,
    stock: number,
    weight: number,
    dimensions: string
  ): PhysicalProduct {
    const product = new PhysicalProduct(name, price, stock, weight, dimensions);

    this.managedProducts.push(product);
    return product;
  }

  public addDigitalProduct(
    name: string,
    price: number,
    stock: number,
    downloadLink: string,
    fileSize: number
  ): DigitalProduct {
    const product = new DigitalProduct(name, price, fileSize, downloadLink);

    this.managedProducts.push(product);
    return product;
  }

  /**
   * Updates the price of a managed product.
   * @param productId The ID of the product to update.
   * @param newPrice The new price to set.
   * @returns True if the product was found and updated, false otherwise.
   */
  updateProductPrice(productId: number, newPrice: number): boolean {
    const product = this.managedProducts.find((p) => p.id === productId);
    if (product) {
      if (newPrice <= 0) {
        throw new Error("Price must be positive!");
      }
      product.price = newPrice;
      return true;
    }
    return false;
  }
}
