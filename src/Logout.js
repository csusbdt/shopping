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
