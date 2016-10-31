var Backbone = require('backbone');

var OrderItem = Backbone.Model.extend({
  idAttribute: '_id'
});

var OrderItemCollection = Backbone.Collection.extend({
  model: OrderItem,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/majesticthaiorders'
  total: function(){
    return this.reduce(function(sum, model){
      return sum + parseFloat(model.get('price'));
    }, 0);
  }
});

var Order = Backbone.Model.extend({
  idAttribute: '_id'
  urlRoot: 'https://tiny-lasagna-server.herokuapp.com/collections/majesticthaiorders'
});

var OrderCollection = Backbone.Collection.extend({
  model: Order,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/majesticthaiorders'
});

module.exports = {
  OrderItem: OrderItem,
  OrderItemCollection: OrderItemCollection,
  Order: Order,
  OrderCollection: OrderCollection
};
