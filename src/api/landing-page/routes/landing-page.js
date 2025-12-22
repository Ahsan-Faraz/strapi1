'use strict';

/**
 * landing-page router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/landing-page',
      handler: 'landing-page.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/landing-page',
      handler: 'landing-page.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/landing-page',
      handler: 'landing-page.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
