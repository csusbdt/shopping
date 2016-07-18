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
