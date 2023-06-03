'use strict';

/**
 * favorite-vendor service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::favorite-vendor.favorite-vendor');
