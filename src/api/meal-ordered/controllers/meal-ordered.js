'use strict';

/**
 * meal-ordered controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::meal-ordered.meal-ordered', ({ Strapi }) => ({
  async createMealOrdered(ctx) {
    try {
      const user = ctx.state.user;
      const vendor = ctx.state.vendor
      if (!user) {
        return ctx.badRequest(401, [ { messages: "No authorized user found!" } ]);
      }
      const result = await strapi.entityService.create('api::meal-ordered.meal-ordered', {
        data: {
          name: ctx.request.body.name,
          vendor: ctx.request.body.vendor,
          email: user.email,
          user: user.id
        }
      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: err.message } ] } ]);
    }
  },
  async getMealOrdered(ctx) {
    try {
      const user = ctx.state.user;
      const vendor = ctx.state.vendor;

      if (!user) {
        return ctx.badRequest(401, [ { messages: "No authorized user found!" } ]);
      }
      const result = await strapi.db.query('api::meal-ordered.meal-ordered').findOne({
        where: {
          user: {
            id: {
              $eq: user.id
            }
          },

        },
      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: 'Error' } ] } ]);
    }
  },

}));
