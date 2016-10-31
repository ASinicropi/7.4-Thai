var Backbone = require('backbone');

var MenuItem = Backbone.Model.extend({
  idAttribute: '_id'
});

var MenuCollection = Backbone.Collection.extend({
  model: MenuItem,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/majesticthai'
});

module.exports = {
  MenuItem: MenuItem,
  MenuCollection: MenuCollection
};
