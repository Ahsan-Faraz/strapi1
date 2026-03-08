export default {
  routes: [
    { method: 'GET', path: '/moving-cleaning', handler: 'moving-cleaning.find' },
    { method: 'PUT', path: '/moving-cleaning', handler: 'moving-cleaning.update' },
    { method: 'DELETE', path: '/moving-cleaning', handler: 'moving-cleaning.delete' },
  ],
};
