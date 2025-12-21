export default {
  routes: [
    {
      method: 'GET',
      path: '/hero-section',
      handler: 'hero-section.find',
    },
    {
      method: 'PUT',
      path: '/hero-section',
      handler: 'hero-section.update',
    },
    {
      method: 'DELETE',
      path: '/hero-section',
      handler: 'hero-section.delete',
    },
  ],
};



