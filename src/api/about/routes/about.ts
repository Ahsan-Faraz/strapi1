export default {
  routes: [
    {
      method: 'GET',
      path: '/about',
      handler: 'about.find',
    },
    {
      method: 'PUT',
      path: '/about',
      handler: 'about.update',
    },
    {
      method: 'DELETE',
      path: '/about',
      handler: 'about.delete',
    },
  ],
};



