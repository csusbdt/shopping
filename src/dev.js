var ReactDOM = require('react-dom');
var React = require('react');
var App = require('./App'); 

var config = {
    apiKey: "AIzaSyBVnmwGxlpgue3DPfdQwlc_kJ7yPnSDYT0",
    authDomain: "shopping-f02b6.firebaseapp.com",
    databaseURL: "https://shopping-f02b6.firebaseio.com",
    storageBucket: "shopping-f02b6.appspot.com",
};

ReactDOM.render(
    <App config={config} />, 
    document.getElementById('app')
);
