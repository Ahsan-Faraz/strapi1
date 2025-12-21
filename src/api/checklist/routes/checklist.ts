export default {
  routes: [
    {
      method: 'GET',
      path: '/checklist',
      handler: 'checklist.find',
    },
    {
      method: 'PUT',
      path: '/checklist',
      handler: 'checklist.update',
    },
    {
      method: 'DELETE',
      path: '/checklist',
      handler: 'checklist.delete',
    },
  ],
};



