var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var OrderingContainer = require('./components/ordering.jsx').OrderingContainer;

$(function(){
  ReactDOM.render(
    React.createElement(OrderingContainer),
    document.getElementById('app')
  );
});
