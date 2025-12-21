export default {
  routes: [
    {
      method: 'GET',
      path: '/how-it-work',
      handler: 'how-it-work.find',
    },
    {
      method: 'PUT',
      path: '/how-it-work',
      handler: 'how-it-work.update',
    },
    {
      method: 'DELETE',
      path: '/how-it-work',
      handler: 'how-it-work.delete',
    },
  ],
};



