export default {
  routes: [
    { method: 'GET', path: '/extras-cleaning', handler: 'extras-cleaning.find' },
    { method: 'PUT', path: '/extras-cleaning', handler: 'extras-cleaning.update' },
    { method: 'DELETE', path: '/extras-cleaning', handler: 'extras-cleaning.delete' },
  ],
};
