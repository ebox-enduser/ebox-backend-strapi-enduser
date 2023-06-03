'use strict';

/**
 * favorite-vendor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::favorite-vendor.favorite-vendor', ({ Strapi }) => ({
  async createFavoriteVendor(ctx) {
    try {
      const user = ctx.state.user;

      if (!user) {
        return ctx.badRequest(401, [ { messages: "No authorized user found!" } ]);
      }
      const result = await strapi.entityService.create('api::favorite-vendor.favorite-vendor', {
        data: {
          vendor: ctx.request.body.vendor,
          email: user.email,
          user: user.id,
        },
        populate: [ 'vendor', 'user' ],

      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: err.message } ] } ]);
    }
  },
  async getFavoriteVendor(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.badRequest(401, [ { messages: "No authorized user found!" } ]);
      }
      const result = await strapi.db.query('api::favorite-vendor.favorite-vendor').findMany({
        where: {
          user: {
            id: {
              $eq: user.id
            }
          },
        },
        populate: [ 'vendor', 'user' ],

      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: 'Error' } ] } ]);
    }
  },
  async deleteFavoriteVendor(ctx) {
    try {
      const user = ctx.state.user;

      if (!user) {
        return ctx.badRequest(401, [ { messages: "No authorized user found!" } ]);
      }
      const result = await strapi.db.query('api::profile.profile').deleteRelations({
        where: {
          user: {
            id: {
              $eq: user.id
            }
          }
        },
        data: {
          vendor: ctx.request.body.vendor,
          email: user.email,
          user: user.id,
        },

        populate: [ 'vendor', 'user' ],

      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: err.message } ] } ]);
    }
  },
}));
