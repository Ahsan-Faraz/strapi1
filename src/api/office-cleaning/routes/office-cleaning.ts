export default {
  routes: [
    { method: 'GET', path: '/office-cleaning', handler: 'office-cleaning.find' },
    { method: 'PUT', path: '/office-cleaning', handler: 'office-cleaning.update' },
    { method: 'DELETE', path: '/office-cleaning', handler: 'office-cleaning.delete' },
  ],
};
