import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.signIn = this.signIn.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(event) {
    const { id } = event.target;
    if (id === 'email') {
      this.setState({ email: event.target.value });
    } else if (id === 'password') {
      this.setState({ password: event.target.value });
    }
  }

  signIn(event) {
    event.preventDefault();
    this.props.signinUser(this.state, this.props.history);
  }

  render() {
    return (
      <div >
        <form id="inputContainer" >
          <label htmlFor="email">Email
            <input id="email" className="inputField" onChange={this.onInputChange} value={this.state.email} />
          </label>
          <label htmlFor="password">Password
            <input id="password" className="inputField" onChange={this.onInputChange} value={this.state.password} />
          </label>
          <button id="signUpInButton" onClick={this.signIn}> Sign In </button>
        </form>
      </div>
    );
  }
}


export default withRouter(connect(null, { signinUser })(SignIn));
