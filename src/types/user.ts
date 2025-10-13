export type UserType = "Customer" | "Admin";
export type CustomerPermissoin =
  | "browse_products"
  | "add_to_cart"
  | "place_order"
  | "view_orders";

export type AdminPermission =
  | "manage_products"
  | "manage_orders"
  | "manage_users"
  | "manage_store";
