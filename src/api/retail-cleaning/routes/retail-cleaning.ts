export default {
  routes: [
    { method: 'GET', path: '/retail-cleaning', handler: 'retail-cleaning.find' },
    { method: 'PUT', path: '/retail-cleaning', handler: 'retail-cleaning.update' },
    { method: 'DELETE', path: '/retail-cleaning', handler: 'retail-cleaning.delete' },
  ],
};
