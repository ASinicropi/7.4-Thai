var React = require('react');

var menuModels = require('../models/menu');
var orderModels = require('../models/orders');

var Order = React.createClass({
  render: function(){
    var self = this;

    var order = this.props.orderCollection.map(function(orderItem){
      return (
        <li key={orderItem.cid}>
          {orderItem.get('title')} : {orderItem.get('price')}
          <button className="btn btn-danger" onClick={function(){self.props.removeItem(orderItem)}}>Remove</button>
        </li>
      );
    });

    return (
      <div className="col-md-4">
        <h1>Your Order</h1>
        <ul>
          {order}
        </ul>
        <strong>Total:</strong> {this.props.orderCollection.total()}
        <div className="row">
          <button onClick={this.props.placeOrder} className="btn btn-warning">Place Order</button>
        </div>
      </div>
    )
  }
});

var Menu = React.createClass({
  render: function(){
    var self = this;
    var menu = this.props.menuItems.map(function(menuItem){
      return (
        <li key={menuItem.get('title')}>
          {menuItem.get('title')} : {menuItem.get('price')}
          <button className="btn btn-success" onClick={function(){self.props.addToOrder(menuItem)}}>Add to Order</button>
        </li>
      );
    });

    return(
      <div className="col-md-8">
        <h1>Menu Items</h1>
        <ul>
          {menu}
        </ul>
      </div>
    );
  }
});

var OrderingContainer = React.createClass({
  getInitialState: function(){
    var menuItems = new menuModels.MenuCollection();
    var orderCollection = new orderModels.OrderItemCollection();

    var orderData = JSON.parse(localStorage.getItem('order'));
    orderCollection.add(orderData);
    orderCollection.fetch();

    menuItems.add([
      {title: 'Fried Spring Roll', price: '1.95'},
      {title: 'Chicken Satay', price: '5.50'},
      {title: 'Curry Fried', price: '5:00'},
      {title: 'Fried Tofu', price: '5:00'},
      {title: 'Tom Kha Gai (Coconut Chicken)', price: '5.25'},
      {title: 'Fried Rice', price: '8.95'}
    ]);

    return{
      menuItems: menuItems,
      orderCollection: orderCollection
    }
  },
  addToOrder: function(menuItem){
    var orderCollection = this.state.orderCollection;
    var orderItemData = menuItem.toJSON();

    delete orderItemData.cid;
    orderCollection.add([orderItemData]);
    this.updateOrder();

    this.setState({orderCollection: orderCollection});
  },
  removeItem: function(itemToRemove){
    var orderCollection = this.state.orderCollection;
    orderCollection.remove(itemToRemove);
    this.updateOrder();
    this.setState({'orderCollection': orderCollection});
  },
  updateOrder: function(){
    var orderCollection = this.state.orderCollection;
    var orderData = JSON.stringify(orderCollection.toJSON());
    localStorage.setItem('order', orderData);
  },
  placeOrder: function(){
    var newOrder = new orderModels.Order();
    var orderCollection = this.state.orderCollection;

    newOrder.set({items: orderCollection.toJSON()});

    this.setState({orderCollection: new orderModels.OrderItemCollection});
  },
  render: function(){
    return (
      <div className="row">
        <Menu addToOrder={this.addToOrder} menuItems={this.state.menuItems}/>
        <Order placeOrder={this.placeOrder} removeItem={this.removeItem} orderCollection={this.state.orderCollection}/>
      </div>
    )
  }
});

module.exports = {
  OrderingContainer: OrderingContainer
};
