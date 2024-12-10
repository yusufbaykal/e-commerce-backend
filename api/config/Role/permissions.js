module.exports = {
  permissions: [
    { key: 'user_view', name: 'View Users', description: 'Permission to view users.' },
    { key: 'user_add', name: 'Add Users', description: 'Permission to add users.' },
    { key: 'user_update', name: 'Update Users', description: 'Permission to update users.' },
    { key: 'user_delete', name: 'Delete Users', description: 'Permission to delete users.' },

    { key: 'product_view_all', name: 'View Products', description: 'Permission to view products.' },
    { key: 'product_add', name: 'Add Products', description: 'Permission to add products.' },
    { key: 'product_update', name: 'Update Products', description: 'Permission to update products.' },
    { key: 'product_delete', name: 'Delete Products', description: 'Permission to delete products.' },

    { key: 'order_view', name: 'View Orders', description: 'Permission to view orders.' },
    { key: 'order_add', name: 'Add Orders', description: 'Permission to add orders.' },
    { key: 'order_update', name: 'Update Orders', description: 'Permission to update orders.' },
    { key: 'order_delete', name: 'Delete Orders', description: 'Permission to delete orders.' },

    { key: 'cart_view', name: 'View Cart', description: 'Permission to view cart items.' },
    { key: 'cart_add', name: 'Add to Cart', description: 'Permission to add items to cart.' },
    { key: 'cart_update', name: 'Update Cart', description: 'Permission to update cart items.' },
    { key: 'cart_delete', name: 'Remove from Cart', description: 'Permission to remove items from cart.' },

    { key: 'category_view', name: 'View Categories', description: 'Permission to view categories.' },
    { key: 'category_add', name: 'Add Categories', description: 'Permission to add categories.' },
    { key: 'category_update', name: 'Update Categories', description: 'Permission to update categories.' },
    { key: 'category_delete', name: 'Delete Categories', description: 'Permission to delete categories.' },

    { key: 'payment_view', name: 'View Payments', description: 'Permission to view payment details.' },
    { key: 'payment_process', name: 'Process Payments', description: 'Permission to process payments.' },

    { key: 'seller_view', name: 'View Sellers', description: 'Permission to view seller details.' },
    { key: 'seller_add', name: 'Add Sellers', description: 'Permission to add new sellers.' },
    { key: 'seller_update', name: 'Update Sellers', description: 'Permission to update seller details.' },
    { key: 'seller_delete', name: 'Delete Sellers', description: 'Permission to delete sellers.' },
  ],
};
