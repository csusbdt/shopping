var React = require('react');
var firebase = require('firebase');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            email: "csusbdt@gmail.com",
            password: "123456",
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
