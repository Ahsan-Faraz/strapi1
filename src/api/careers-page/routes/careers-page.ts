export default {
  routes: [
    {
      method: 'GET',
      path: '/careers-page',
      handler: 'careers-page.find',
    },
    {
      method: 'PUT',
      path: '/careers-page',
      handler: 'careers-page.update',
    },
    {
      method: 'DELETE',
      path: '/careers-page',
      handler: 'careers-page.delete',
    },
  ],
};



