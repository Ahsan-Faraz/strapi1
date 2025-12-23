export default {
  routes: [
    {
      method: 'GET',
      path: '/checklist-page',
      handler: 'checklist-page.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/checklist-page',
      handler: 'checklist-page.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/checklist-page',
      handler: 'checklist-page.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
