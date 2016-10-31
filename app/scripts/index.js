var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var OrderingContainer = require('./components/order.jsx').OrderingContainer;

$(function(){
  ReactDOM.render(
    React.createElement(OrderingContainer),
    document.getElementById('app')
  );
});
