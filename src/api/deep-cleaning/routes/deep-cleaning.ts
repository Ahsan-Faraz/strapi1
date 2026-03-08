export default {
  routes: [
    { method: 'GET', path: '/deep-cleaning', handler: 'deep-cleaning.find' },
    { method: 'PUT', path: '/deep-cleaning', handler: 'deep-cleaning.update' },
    { method: 'DELETE', path: '/deep-cleaning', handler: 'deep-cleaning.delete' },
  ],
};
