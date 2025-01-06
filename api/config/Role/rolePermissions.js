const role_permissions = require('./permissions').permissions;

const roles = [
  {
    id: 'ADMIN',
    name: 'Administrator',
    role_permissions: 'ALL', 
  },
  {
    id: 'USER',
    name: 'User',
    role_permissions: ['product_view', 'cart_view', 'order_view', 'order_add'],
  },
  {
    id: 'SELLER',
    name: 'Seller',
    role_permissions: [
      'product_view_all', 
      'product_add', 
      'product_update',
      'product_delete',
      'order_view', 
      'category_add',
      'category_update',
      'category_delete',
      'payment_view',
      'seller_statistics_view', 
      'seller_performance_view', 
      'seller_daily_metrics_view' 
    ],
  },
];

module.exports = { roles };