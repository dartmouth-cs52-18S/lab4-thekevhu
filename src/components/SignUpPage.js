import React from 'react';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';


class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div >
        <div className="signContainer">
          <SignUp />
        </div>
        <div className="signContainer">
          <SignIn />
          <div />
        </div>
      </div>
    );
  }
}

export default SignUpPage;
