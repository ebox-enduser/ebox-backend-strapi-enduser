module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/user-location/location',
      handler: 'user-location.getLocation',
      config: {}
    },
    {
      method: 'POST',
      path: '/user-location/location',
      handler: 'user-location.createLocation',
      config: {}
    }
  ]
}
