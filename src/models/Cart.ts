import { CartItem } from "./CartItem";
import { Order } from "./Order";
import { Product } from "./Product";

/**
 * Cart class - Manages shopping cart functionality
 */
export class Cart {
  private items: CartItem[] = [];

  // Methods
  addItem(product: Product, quantity: number): boolean {
    // check if product already in cart
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      // check if total qquanity would exceed available stock

      const totalQuantity = existingItem.quantity + quantity;

      if (totalQuantity <= product.stock) {
        existingItem.quantity += quantity;
        return true;
      }
    } else {
      this.items.push(new CartItem(product, quantity));
      return true;
    }
    return false;
  }

  removeItem(productId: number): boolean {
    const index = this.items.findIndex((item) => item.product.id == productId);
    if (index > -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Method to reduce stock when checkout occurs
  reduceSTockOnCheckout(): boolean {
    // Check if all items are still available
    for (const item of this.items) {
      if (item.quantity > item.product.stock) return false;
    }
    for (const item of this.items) {
      if (!item.product.reduceStock) {
        // This shluldint happen if we checked above,but just in case
        return false;
      }
    }
    return true;
  }
}
