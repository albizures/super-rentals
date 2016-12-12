import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    filterByCity(param) {
      console.log('filterByCity action');
      if (param !== '') {
        return this.get('store').query('rental', { city: param });
      } else {
        return this.get('store').findAll('rental');
      }
    }
  }
});
