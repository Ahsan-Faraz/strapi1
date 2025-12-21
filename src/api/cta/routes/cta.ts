export default {
  routes: [
    {
      method: 'GET',
      path: '/cta',
      handler: 'cta.find',
    },
    {
      method: 'PUT',
      path: '/cta',
      handler: 'cta.update',
    },
    {
      method: 'DELETE',
      path: '/cta',
      handler: 'cta.delete',
    },
  ],
};



