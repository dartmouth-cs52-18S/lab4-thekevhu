import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/Login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/Login');
      }
    }s
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => (
    { authenticated: state.auth.authenticated }
  );

  return withRouter(connect(mapStateToProps, null)(RequireAuth));
}
