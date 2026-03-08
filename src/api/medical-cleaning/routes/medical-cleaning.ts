export default {
  routes: [
    { method: 'GET', path: '/medical-cleaning', handler: 'medical-cleaning.find' },
    { method: 'PUT', path: '/medical-cleaning', handler: 'medical-cleaning.update' },
    { method: 'DELETE', path: '/medical-cleaning', handler: 'medical-cleaning.delete' },
  ],
};
