export default {
  routes: [
    {
      method: 'GET',
      path: '/terms-of-service',
      handler: 'terms-of-service.find',
    },
    {
      method: 'PUT',
      path: '/terms-of-service',
      handler: 'terms-of-service.update',
    },
    {
      method: 'DELETE',
      path: '/terms-of-service',
      handler: 'terms-of-service.delete',
    },
  ],
};



