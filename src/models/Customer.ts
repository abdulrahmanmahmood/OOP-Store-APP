import { CustomerPermissoin, UserType } from "../types/user";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { User } from "./User";

/**
 * Customer class extends abstract User
 * - Implement abstract methods with customer-specific behavior
 */
class Customer extends User {
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
}

const customer = new Customer("23432", "ahmmed");
