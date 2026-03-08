export default {
  routes: [
    { method: 'GET', path: '/airbnb-cleaning', handler: 'airbnb-cleaning.find' },
    { method: 'PUT', path: '/airbnb-cleaning', handler: 'airbnb-cleaning.update' },
    { method: 'DELETE', path: '/airbnb-cleaning', handler: 'airbnb-cleaning.delete' },
  ],
};
