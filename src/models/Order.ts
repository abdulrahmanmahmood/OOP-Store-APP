import { OrderStatus } from "../types/order";
import { CartItem } from "./CartItem";
import { Customer } from "./Customer";
import { Product } from "./Product";

export class Order {
  // Attributes
  private readonly _orderId: number;
  private readonly _customer: Customer;
  private _total: number;
  private _status: OrderStatus = "Pending";
  private _createdAt: Date = new Date();
  private _updatedAt: Date = new Date();

  private static nextOrderId: number = 1;
  private static _allOrders: Order[] = [];

  constructor(customer: Customer, private readonly items: CartItem[]) {
    if (!customer) {
      throw new Error("Customer is required");
    }
    if (!items || items.length === 0) {
      throw new Error("Items are required");
    }
    this._orderId = Order.nextOrderId++;
    this._customer = customer;
    this._total = this.calculateTotal();
    Order._allOrders.push(this);
  }

  // methods

  /**
   * Calculates the total price of all items in the order
   * Formula: sum of (item.price* item.quantity)
   * @returns Total Amount of the Order
   */
  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  /**
   * getOrderId
   * @returns Order ID
   */
  get OrderId(): number {
    return this._orderId;
  }
  /**
   * Get Order Summary
   * @returns Summary of the order including items and total
   */
  getOrderSummary(): string {
    const itemSummaries = this.items
      .map((item) => `${item.product.name} (x${item.quantity})`)
      .join(", ");
    return `Order ID: ${this.OrderId}, Customer: ${this.Customer.name}, Items: [${itemSummaries}], Total: ${this.Total}`;
  }

  /**
   * getCustomer
   * @returns Customer who placed the order
   */
  get Customer(): Customer {
    return this._customer;
  }

  /**
   * getItems
   * @returns Items in the order
   */
  get Items(): CartItem[] {
    return this.items;
  }

  /** getTotal
   * @returns Total amount of the order
   */
  get Total(): number {
    return this._total;
  }
  /** getStatus
   * @returns Current status of the order
   */
  get Status(): OrderStatus {
    return this._status;
  }

  /**
   * getCreatedAt
   * @returns Date when the order was created
   */
  get CreatedAt(): Date {
    return this._createdAt;
  }

  /**
   * getUpdatedAt
   * @returns Date when the order was last updated
   */
  get UpdatedAt(): Date {
    return this._updatedAt;
  }

  /**
   * Get Order History
   * @returns Array of recent orders
   */
  get OrderHistory(): Order[] {
    return this._customer.getOrderHistory();
  }

  /**
   * Get recent Orders (last N orders)
   * @param count : number
   * @returns Array or recent orders
   */
  getRecentOrders(count: number): Order[] {
    return this._customer.getOrderHistory();
  }

  /**
   * Get All Orders (static method)
   * @returns Array of all orders
   */
  public static getAllOrders(): Order[] {
    return Order._allOrders;
  }

  /**
   * Get total revenue from this customer
   * @returns Total revenue amount
   */
  getTotalRevenue(): number {
    return this._customer
      .getOrderHistory()
      .reduce((sum, order) => sum + order.Total, 0);
  }

  public static getTotalRevenue(): number {
    return Order.getAllOrders().reduce(
      (total, order) => total + order.Total,
      0
    );
  }
  public static getAverageOrderValue(): number {
    const allOrders = Order.getAllOrders();
    if (allOrders.length === 0) return 0;
    const totalRevenue = Order.getTotalRevenue();
    return totalRevenue / allOrders.length;
  }

  // Setters

  /**
   * Updates the status of the order
   * @param newStatus New status to set
   */
  updateStatus(newStatus: OrderStatus): void {
    this._status = newStatus;
    this._updatedAt = new Date();
  }
}

const items = [
  new CartItem(new Product("Product 1", 100, 200, "Digital"), 2),

  new CartItem(new Product("Product 2", 100, 200, "Physical"), 2),
  new CartItem(new Product("Product 3", 100, 200, "Digital"), 2),
];

const customer = new Customer("John Doe", "john.doe@example.com");
const order = new Order(customer, items);
console.log(order.OrderId);
