const router = {
  products: [
    // products
    {
      httpRoute: '/:queryselector',
      route: '/routes/api/products/products.route',
      handler: 'get',
      method: 'GET',
    },
    {
      httpRoute: '/',
      route: '/routes/api/products/products.route',
      handler: 'create',
      method: 'POST',
    },
    {
      httpRoute: '/',
      route: '/routes/api/products/products.route',
      handler: 'update',
      method: 'PATCH',
    },
    {
      httpRoute: '/',
      route: '/routes/api/products/products.route',
      handler: 'delete',
      method: 'DELETE',
    },
  ],
  user: [
    // user-api
    {
      httpRoute: '/:queryselector',
      route: '/routes/api/user-api/user-api.route',
      handler: 'get',
      method: 'GET',
    },
  ],
};

module.exports = router;
