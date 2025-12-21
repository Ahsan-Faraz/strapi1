export default {
  routes: [
    {
      method: 'GET',
      path: '/privacy-policy',
      handler: 'privacy-policy.find',
    },
    {
      method: 'PUT',
      path: '/privacy-policy',
      handler: 'privacy-policy.update',
    },
    {
      method: 'DELETE',
      path: '/privacy-policy',
      handler: 'privacy-policy.delete',
    },
  ],
};



