module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/favorite-vendors/favorite',
      handler: 'favorite-vendor.getFavoriteVendor',
      config: {}
    },
    {
      method: 'POST',
      path: '/favorite-vendors/favorite',
      handler: 'favorite-vendor.createFavoriteVendor',
      config: {}
    },
    {
      method: 'DELETE',
      path: '/favorite-vendors/favorite',
      handler: 'favorite-vendor.deleteFavoriteVendor',
      config: {}
    }
  ]
}
