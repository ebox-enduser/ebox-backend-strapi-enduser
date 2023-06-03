'use strict';

/**
 * user-location controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-location.user-location', ({ Strapi }) => ({
  async createLocation(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.badRequest(401, [ { messages: "No authorized user found!" } ]);
      }
      const result = await strapi.entityService.create('api::user-location.user-location', {
        data: {
          name: ctx.request.body.name,
          description: ctx.request.body.description,
          position: ctx.request.body.position,
          address: ctx.request.body.address,
          email: user.email,
          user: user.id
        }
      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: err.message } ] } ]);
    }
  },
  async getLocation(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.badRequest(401, [ { messages: "No authorized user found!" } ]);
      }
      const result = await strapi.db.query('api::user-location.user-location').findOne({
        where: {
          user: {
            id: {
              $eq: user.id
            }
          }
        },
        populate: [ 'user' ],

      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: 'Error' } ] } ]);
    }
  },


}));
