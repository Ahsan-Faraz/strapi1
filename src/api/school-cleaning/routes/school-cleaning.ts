export default {
  routes: [
    { method: 'GET', path: '/school-cleaning', handler: 'school-cleaning.find' },
    { method: 'PUT', path: '/school-cleaning', handler: 'school-cleaning.update' },
    { method: 'DELETE', path: '/school-cleaning', handler: 'school-cleaning.delete' },
  ],
};
