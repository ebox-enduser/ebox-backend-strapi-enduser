module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/meal-ordered/meal_ordered',
      handler: 'meal-ordered.getMealOrdered',
      config: {}
    },
    {
      method: 'POST',
      path: '/meal-ordered/meal_ordered',
      handler: 'meal-ordered.createMealOrdered',
      config: {}
    }
  ]
}
