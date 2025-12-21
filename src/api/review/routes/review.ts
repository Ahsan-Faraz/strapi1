export default {
  routes: [
    {
      method: 'GET',
      path: '/review',
      handler: 'review.find',
    },
    {
      method: 'PUT',
      path: '/review',
      handler: 'review.update',
    },
    {
      method: 'DELETE',
      path: '/review',
      handler: 'review.delete',
    },
  ],
};



