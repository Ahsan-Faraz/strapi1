export default {
  routes: [
    { method: 'GET', path: '/property-cleaning', handler: 'property-cleaning.find' },
    { method: 'PUT', path: '/property-cleaning', handler: 'property-cleaning.update' },
    { method: 'DELETE', path: '/property-cleaning', handler: 'property-cleaning.delete' },
  ],
};
