export default {
  routes: [
    { method: 'GET', path: '/other-commercial-cleaning', handler: 'other-commercial-cleaning.find' },
    { method: 'PUT', path: '/other-commercial-cleaning', handler: 'other-commercial-cleaning.update' },
    { method: 'DELETE', path: '/other-commercial-cleaning', handler: 'other-commercial-cleaning.delete' },
  ],
};
