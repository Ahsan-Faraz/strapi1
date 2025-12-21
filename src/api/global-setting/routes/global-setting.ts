export default {
  routes: [
    {
      method: 'GET',
      path: '/global-setting',
      handler: 'global-setting.find',
    },
    {
      method: 'PUT',
      path: '/global-setting',
      handler: 'global-setting.update',
    },
    {
      method: 'DELETE',
      path: '/global-setting',
      handler: 'global-setting.delete',
    },
  ],
};



