import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import '../style.scss';

import { signoutUser } from '../actions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.onSignOutClick = this.onSignOutClick.bind(this);
  }
  onSignOutClick(event) {
    event.preventDefault();
    this.props.signoutUser(this.props.history);
  }

  renderSignInOutButton() {
    if (this.props.auth) {
      return <button id="signUpOutButton" onClick={this.onSignOutClick}>Sign Out</button>;
    } else {
      return <button id="signUpOutButton"> <NavLink to="/Login" > Sign In </NavLink></button>;
    }
  }
  render() {
    return (
      <nav id="navBar">
        <ul id="navBarItems">
          <li><NavLink exact to="/">A Blog of Bob the Blob</NavLink></li>
          <li><NavLink to="/posts/new">Add Post</NavLink></li>
        </ul>
        {this.renderSignInOutButton()}

      </nav>
    );
  }
}


const mapStateToProps = state => (
  {
    auth: state.auth.authenticated,

  }

);

export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));
