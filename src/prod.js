var ReactDOM = require('react-dom');
var React = require('react');
var App = require('./App');

var config = {
    apiKey: "AIzaSyCrfwySNvIe0tOlWx6TnVxR08ES-CaasNI",
    authDomain: "shopping2-e3735.firebaseapp.com",
    databaseURL: "https://shopping2-e3735.firebaseio.com",
    storageBucket: "shopping2-e3735.appspot.com",
};

ReactDOM.render(
    <App config={config} />, 
    document.getElementById('app')
);
