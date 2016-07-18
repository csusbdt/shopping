# Project Setup Record

## Create accounts

* Create an empty GitHub project.
* Create a Cloud9 project; clone from GitHub, select blank workspace template.
* Create a Firebase project.

## Enable email/password sign-in

Obtain the hostname of the Cloud9 project.  From the Cloud9 command line:

~~~
echo $C9_HOSTNAME
~~~

In the Firebase console for the project, enable email/password sign-in.
Add an _OAuth Redirect Domain_ using the hostname you determined from 
the previous command.

## Create public directory

In your Cloud9 workspace, create a folder named "public".  Create file
_index.html_ in this folder with the following contents.

~~~
<html>
  <head>
    <meta charset="utf-8" />
    <title>Shopping List App</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
</html>
~~~

## Create src directory

Create a directory named _src_ in your workspace to hold Javascript code.

## Get initialization parameters

In the firebase Web console, select Auth and click on _Web Setup_ to obtain 
the configuration parameters.  Create file _src/dev.js_ with the following
contents, replacing the example config object with the one you get from the
Firebase console.

~~~
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
~~~

## Create partially implemented app for testing

The app will provide account creation, login and logout functionality only.

Create _src/App.js_ with the following contents.

~~~
var firebase = require("firebase");
var React    = require('react');
var Auth     = require('./Auth');
var List     = require('./List');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            uid: null 
        };
    },
    componentWillMount: function() {
        firebase.initializeApp(this.props.config);
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.setState({ user: user });
            } else {
                this.setState({ user: null });
            }
        }.bind(this));
    },
    render: function() {
        if (this.state.user === undefined) {
            return null;
        } else if (this.state.user === null) {
            return <Auth/>;
        } else {
            return <List user={this.state.user} />;
        }
    }
});
~~~

Create _src/Auth.js_ with the following contents.

~~~
var React = require('react');
var firebase = require('firebase');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            email: "",
            password: "",
            errorMessage: ""
        };
    },
    create: function(e) {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(function(error) {
            this.setState({ errorMessage: error.message });
        }.bind(this));
        e.preventDefault();
    },
    login: function(e) {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(function(error) {
            this.setState({ errorMessage: error.message });
        }.bind(this));
        e.preventDefault();
    },
    handleEmailChange: function(e) {
        this.setState({ email: e.target.value });
    },
    handlePasswordChange: function(e) {
        this.setState({ password: e.target.value });
    },
    render: function() {
        return (
            <div>
                <div>
                    Email:
                    <input 
                        type="text" 
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                </div>
                <div>
                    Password:
                    <input 
                        type="password" 
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                </div>
                <div>
                    <input type="submit" onClick={this.login} value="Login" />
                    <input type="submit" onClick={this.create} value="Create account" />
                </div>
                <div>
                    {this.state.errorMessage}
                </div>
            </div>
        );
    }
});
~~~

Create file _src/Logout.js_ with the following contents.

~~~
var React = require('react');
var firebase = require('firebase');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            errorMessage: ""
        };
    },
    logout: function(e) {
        firebase
        .auth()
        .signOut()
        .then(function() {}, function(error) {
            this.setState({ errorMessage: error.message });
        }.bind(this));
        e.preventDefault();
    },
    render: function() {
        return (
            <div>
                <input type="submit" onClick={this.logout} value="Logout" />
                {this.state.errorMessage}
            </div>
        );
    }
});
~~~

Create file _src/List.js_ with the following contents.
This is a stub; later, replace with full implementation.

~~~
var React    = require('react');
var Logout   = require('./Logout');

module.exports = React.createClass({
    render: function() {
        return <Logout/>;
    }
});
~~~

Generate _package.json_.  Use _--force_ to accept defaults.

~~~
cd ~/workspace
npm init --force
~~~

Create file _run.sh_ with the following contents.

~~~
webpack-dev-server            \
    --entry "./src/dev.js"    \
    --port $PORT              \
    --host $IP                \
    --content-base "public/"  \
    --watch
~~~

Set the execute permission bits.

~~~
chmod +x run.sh
~~~

Create _~/webpack.config.js_ with the following contents.

~~~
module.exports = {
        output: {
                path: './public',
                filename: 'bundle.js'
        },
        module: {
                loaders: [{
                        test: /\.js?$/,
                        exclude: /node_modules/,
                        loader: 'jsx-loader' }
                ]
        }
};
~~~

## Install other dependencies and tools.

~~~
cd ~/workspace
npm install --save-dev react
npm install --save-dev react-dom
npm install --save-dev jsx-loader
npm install --save-dev firebase
npm install -g webpack
npm install -g webpack-dev-server
~~~

Run `./run.sh` and go to hostname determined from `echo $C9_HOSTNAME`.

## Setup production deployment

Create another firebase project for production deployment.  Enable
email/password authentication.

Create file _src/prod.js_ by copying _dev.js._  Replace the configuration
parameters with the new firebase project.

~~~
cd ~/workspace
npm install -g firebase-tools
~~~

Authenticate to firebase. (Only needs to be done once in my experience.)

~~~
firebase login --no-localhost
~~~

Generate _firebase.json_ with the following command and chose 
the options listed below.

~~~
firebase init
~~~

* Accept the 2 default features: deployment of database rules and hosting.
* Select your newly created firebase project.
* Accept the default name for the database rules.
* Accept the default _public_ directory.
* Configure as a single-page app.
* Do not overwrite index.html.

Create file _deploy.sh_ with the following content.

~~~
webpack --entry "./src/prod.js"
firebase deploy
~~~

Set the execute permission bits.

~~~
chmod +x deploy.sh_
~~~

## Commit to repo

Create _.gitignore_ with the following contents.

~~~
public/bundle.js
~~~

Git add, commit and push.
