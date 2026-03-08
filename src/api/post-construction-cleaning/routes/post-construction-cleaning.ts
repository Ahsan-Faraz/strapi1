export default {
  routes: [
    { method: 'GET', path: '/post-construction-cleaning', handler: 'post-construction-cleaning.find' },
    { method: 'PUT', path: '/post-construction-cleaning', handler: 'post-construction-cleaning.update' },
    { method: 'DELETE', path: '/post-construction-cleaning', handler: 'post-construction-cleaning.delete' },
  ],
};
