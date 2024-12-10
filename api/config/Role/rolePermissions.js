const role_permissions = require("./permissions").permissions;

const roles = [
  {
    id: "ADMIN",
    name: "Administrator",
    role_permissions: "ALL"
  },
  {
    id: "USER",
    name: "User",
    role_permissions: ["product_view", "cart_view", "order_view", "order_add"]
  },
  {
    id: "SELLER",
    name: "Seller",
    role_permissions: ["product_view", "product_add", "order_view", "payment_view"]
  }
];

module.exports = {roles};

