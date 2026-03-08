export default {
  routes: [
    { method: 'GET', path: '/gym-cleaning', handler: 'gym-cleaning.find' },
    { method: 'PUT', path: '/gym-cleaning', handler: 'gym-cleaning.update' },
    { method: 'DELETE', path: '/gym-cleaning', handler: 'gym-cleaning.delete' },
  ],
};
