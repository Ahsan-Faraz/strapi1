export default {
  routes: [
    {
      method: 'GET',
      path: '/contact',
      handler: 'contact.find',
    },
    {
      method: 'PUT',
      path: '/contact',
      handler: 'contact.update',
    },
    {
      method: 'DELETE',
      path: '/contact',
      handler: 'contact.delete',
    },
  ],
};



