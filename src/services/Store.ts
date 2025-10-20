import { Admin } from "../models/Admin";
import { Customer } from "../models/Customer";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { User } from "../models/User";

class Store {
  // Attributes
  products: Product[] = [];
  private readonly users: User[] = [];
  private readonly orders: Order[] = [];
  private _storeName: string;
  private _isOpen: boolean = true;

  constructor(storeName: string) {
    this._storeName = storeName;
  }
  get storeName(): string {
    return this._storeName;
  }
  get isOpen(): boolean {
    return this._isOpen;
  }

  get productCount(): number {
    return this.products.length;
  }

  // Setters with validation
  set storeName(name: string) {
    if (name.trim().length === 0) {
      throw new Error("Store name cannot be empty.");
    }
    if (name.length < 3) {
      throw new Error("Store name must be at least 3 characters long.");
    }
    this._storeName = name;
  }
  set isOpen(status: boolean) {
    if (typeof status !== "boolean") {
      throw new Error("Status must be a boolean value.");
    }
    this._isOpen = status;
  }

  // Methods
  /**
   *
   * @param name
   * @param email
   * @param isAdmin
   * @returns The new User
   */
  public registerUser(
    name: string,
    email: string,
    isAdmin: boolean = false
  ): User {
    if (!this._isOpen) {
      throw new Error("Store is closed");
    }
    if (!name || name.trim().length == 0) {
      throw new Error("Name cannot be empty");
    }
    if (!email || !this.isValidEmail(email)) {
      throw new Error("Invalid email");
    }
    if (this.users.some((user) => (user.email = email))) {
      throw new Error("User already exists");
    }
    if (isAdmin) {
      const newAdmin = new Admin(name, email);
      return newAdmin;
    } else {
      const newCustomer = new Customer(name, email);
      return newCustomer;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }
  /**
   *
   * @param product
   */
  public addProduct(product: Product): void {
    if (!this._isOpen) {
      throw new Error("Store is closed");
    }
    if (!product) {
      throw new Error("Product is required");
    }
    if (this.products.some((p) => p.id === product.id)) {
      throw new Error("Product already exists");
    }
    this.products.push(product);
  }
  /**
   * Removes a product from the store
   * @param productId
   */
  public removeProduct(productId: number): void {
    if (!this._isOpen) {
      throw new Error("Store is closed");
    }
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    this.products.splice(productIndex, 1);
  }
  /**
   * Return a copy of all products
   * @returns Acopy of all Products
   */
  public getProducts(): Product[] {
    return [...this.products];
  }

  /**
   *
   * @param id
   * @returns product | undifiend
   */
  public findProductById(id: number): Product {
    if (!id) {
      throw new Error("Id is mandatory");
    }
    if (!Number.isInteger(id)) {
      throw new Error("Invalid id number");
    }
    const product = this.findProductById(id);
    if (!product) {
      throw new Error("there is not product with this id");
    } else {
      return product;
    }
  }

  /**
   *
   * @param userId
   * @returns The user information
   */
  public getUserInfo(userId: number): string {
    const user = this.users.find((user) => user.Id === userId);
    if (!user) {
      throw new Error("User not found");
    }

    return `${user.getInfo()} - Permissions: ${user
      .getPermissions()
      .join(", ")}`;
  }
  /**
   *
   * @param order
   * @throws Error if store is closed or order is invalid
   */
  public processOrder(order: Order): void {
    if (!this._isOpen) {
      throw new Error("Store is currently closed");
    }
    if (!order) {
      throw new Error("Order cannot be null or undefined");
    }
    if (order.Customer.Id !== order.Customer.Id) {
      throw new Error("Order customer ID does not match customer ID");
    }
    this.orders.push(order);
  }

  public getStoreStats(): string {
    return `The Store "${this._storeName}" is currently ${
      this._isOpen ? "Open" : "Closed"
    }. It has ${this.productCount} products, ${
      this.users.length
    } registered users, and ${this.orders.length} orders processed.
    total Admins: $${
      this.users.filter((user) => user.getRole() === "Admin").length
    }
    total Customers: $${
      this.users.filter((user) => user.getRole() === "Customer").length
    }
    total Orders: $${this.orders.length}
    total Products: $${this.products.length}
    
    `;
  }
  /**
   * @return A copy of all orders
   * @returns {Order[]}
   */
  public getOrders(): Order[] {
    return [...this.orders];
  }

  private getStoreStatus(): string {
    return `Store "${this._storeName}" is currently ${
      this._isOpen ? "Open" : "Closed"
    },
    with ${this.productCount} products available for purchase.
    Total Users: ${this.users.length},
    Total Orders Processed: ${Order.getAllOrders().length}.
    Average order value: $${Order.getAverageOrderValue()}.
    total customers: $${
      this.users.filter((user) => user.getRole() === "Customer").length
    }
    total admins: $${
      this.users.filter((user) => user.getRole() === "Admin").length
    }  
    total products: $${this.products.length}
    Total Revenue: $${Order.getTotalRevenue()}.
    products created: $${Order.getAllOrders().length}
    

    `;
  }
}
