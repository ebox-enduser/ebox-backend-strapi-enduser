'use strict';

/**
 *  profile controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::profile.profile', ({ Strapi }) => ({
  async createMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.badRequest(401, [ { messages: "No athorized user found!" } ]);
      }
      const result = await strapi.entityService.create('api::profile.profile', {
        data: {
          fullName: ctx.request.body.fullName,
          phoneNumber: ctx.request.body.phoneNumber,
          birthday: ctx.request.body.birthday,
          imageURL: ctx.request.body.imageURL,
          gender: ctx.request.body.gender,
          email: user.email,
          user: user.id
        }
      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: err.message } ] } ]);
    }
  },
  async getMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.badRequest(401, [ { messages: "No athorized user found!" } ]);
      }
      const result = await strapi.db.query('api::profile.profile').findOne({
        where: {
          user: {
            id: {
              $eq: user.id
            }
          }
        },
      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: 'Error' } ] } ]);
    }
  },
  async updateMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.badRequest(401, [ { messages: "No authorized user found!" } ]);
      }
      const result = await strapi.db.query('api::profile.profile').update({
        where: {
          user: {
            id: {
              $eq: user.id
            }
          }
        },

        data: {
          fullName: ctx.request.body.fullName,
          phoneNumber: ctx.request.body.phoneNumber,
          birthday: ctx.request.body.birthday,
          imageURL: ctx.request.body.imageURL,
          gender: ctx.request.body.gender,
          email: user.email,
          user: user.id
        },
      });
      return result;
    } catch (err) {
      return ctx.badRequest(500, [ { messages: [ { id: 'Error' } ] } ]);
    }
  },
}));
