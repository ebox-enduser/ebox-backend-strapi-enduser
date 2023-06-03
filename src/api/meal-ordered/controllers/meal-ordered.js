'use strict';

/**
 * meal-ordered controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::meal-ordered.meal-ordered', ({ Strapi }) => ({
  async createMealOrdered(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.badRequest(401, [ { messages: "No authorized user found!" } ]);
      }
      const result = await strapi.entityService.create('api::meal-ordered.meal-ordered', {
        data: {
          name: ctx.request.body.name,
          totalPrice: ctx.request.body.totalPrice,
          paymentMethod: ctx.request.body.paymentMethod,
          address: ctx.request.body.address,
          meals: ctx.request.body.meals,
          vendor: ctx.request.body.vendor,
          email: user.email,
          user: user.id
        },
        populate: [ 'vendor', 'user', 'meals' ],

      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: err.message } ] } ]);
    }
  },
  async getMealOrdered(ctx) {
    try {
      const user = ctx.state.user;

      if (!user) {
        return ctx.badRequest(401, [ { messages: "No authorized user found!" } ]);
      }
      const result = await strapi.db.query('api::meal-ordered.meal-ordered').findMany({
        where: {
          user: {
            id: {
              $eq: user.id
            }
          },

        }, populate: [ 'vendor.image', 'vendor.vendorImageBackground', 'vendor.meals.image', 'meals.image', 'user', ],

      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: 'Error' } ] } ]);
    }
  },

}));
