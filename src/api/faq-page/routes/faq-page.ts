export default {
  routes: [
    {
      method: 'GET',
      path: '/faq-page',
      handler: 'faq-page.find',
    },
    {
      method: 'PUT',
      path: '/faq-page',
      handler: 'faq-page.update',
    },
    {
      method: 'DELETE',
      path: '/faq-page',
      handler: 'faq-page.delete',
    },
  ],
};



