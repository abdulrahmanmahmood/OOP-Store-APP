import { CustomerPermissoin, UserType } from "../types/user";
import { Cart } from "./Cart";
import { CartItem } from "./CartItem";
import { Order } from "./Order";
import { Product } from "./Product";
import { User } from "./User";

/**
 * Customer class extends abstract User
 * - Implement abstract methods with customer-specific behavior
 */
export class Customer extends User {
  private readonly cart: Cart;
  private readonly orders: Order[] = [];

  constructor(name: string, email: string) {
    super(name, email);
    this.cart = new Cart();
  }

  getRole(): UserType {
    return "Customer";
  }

  getPermissions(): CustomerPermissoin[] {
    return ["add_to_cart", "browse_products", "view_orders", "place_order"];
  }

  // Getter for customer statics
  get cartItemCount(): number {
    return this.cart.getItemCount();
  }

  get cartTotal(): number {
    return this.cart.getTotalPrice();
  }

  get orderCount(): number {
    return 0;
  }

  get hasItemsInCart(): boolean {
    return !this.cart.isEmpty();
  }

  /**
   * Adds a prdouct to the customer's cart
   * @param product
   * @param quantity
   * @returns
   */

  addToCart(product: Product, quantity: number): boolean {
    return this.cart.addItem(product, quantity);
  }

  /**
   *
   * @returns All items currently in the Customer's cart
   */
  viewCart(): CartItem[] {
    return this.cart.getItems();
  }

  checkout() {
    // checkout functionality here....
  }
  /**
   * Get Order History
   * @returns Array or recent orders
   */
  getOrderHistory(): Order[] {
    return [];
  }
  /**
   * Get recent Orders (last N orders)
   * @param count : number
   * @returns Array or recent orders
   */
  getRecentOrders(count: number = 5): Order[] {
    return [];
  }

  /**
   * Remove Item from the Cart
   * @param productId (number)
   * @returns Boolean
   */
  removeFromCart(productId: number): boolean {
    return this.cart.removeItem(productId);
  }

  clearCart(): void {
    return this.cart.clear();
  }
}

const customer = new Customer("23432", "ahmmed");
