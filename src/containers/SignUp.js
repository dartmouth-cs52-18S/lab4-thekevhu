import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      author: '',
    };

    this.signUp = this.signUp.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(event) {
    const { id } = event.target;
    if (id === 'email') {
      this.setState({ email: event.target.value });
    } else if (id === 'password') {
      this.setState({ password: event.target.value });
    } else if (id === 'author') {
      this.setState({ author: event.target.value });
    }
  }

  signUp(event) {
    this.props.signupUser(this.state, this.props.history);
    event.preventDefault();
  }

  render() {
    return (
      <div >
        <form id="inputContainer" >
          <label htmlFor="authoer">Username
            <input id="author" className="inputField" onChange={this.onInputChange} value={this.state.author} />
          </label>
          <label htmlFor="email">Email
            <input id="email" className="inputField" onChange={this.onInputChange} value={this.state.email} />
          </label>
          <label htmlFor="password">Password
            <input id="password" className="inputField" onChange={this.onInputChange} value={this.state.password} />
          </label>
          <button id="signUpInButton" onClick={this.signUp}> Sign Up </button>
        </form>
      </div>
    );
  }
}


// react-redux glue -- outputs Container that knows how to call actions
// new way to connect with react router
export default withRouter(connect(null, { signupUser })(SignUp));
