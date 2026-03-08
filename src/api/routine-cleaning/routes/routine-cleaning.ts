export default {
  routes: [
    { method: 'GET', path: '/routine-cleaning', handler: 'routine-cleaning.find' },
    { method: 'PUT', path: '/routine-cleaning', handler: 'routine-cleaning.update' },
    { method: 'DELETE', path: '/routine-cleaning', handler: 'routine-cleaning.delete' },
  ],
};
