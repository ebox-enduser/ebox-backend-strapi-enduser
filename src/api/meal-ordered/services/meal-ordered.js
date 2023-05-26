'use strict';

/**
 * meal-ordered service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::meal-ordered.meal-ordered');
