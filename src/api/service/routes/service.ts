export default {
  routes: [
    {
      method: 'GET',
      path: '/services',
      handler: 'service.find',
    },
    {
      method: 'GET',
      path: '/services/:id',
      handler: 'service.findOne',
    },
    {
      method: 'POST',
      path: '/services',
      handler: 'service.create',
    },
    {
      method: 'PUT',
      path: '/services/:id',
      handler: 'service.update',
    },
    {
      method: 'DELETE',
      path: '/services/:id',
      handler: 'service.delete',
    },
  ],
};



