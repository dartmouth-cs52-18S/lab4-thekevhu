import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import NewPost from '../containers/newPost';
import Post from '../containers/Post';
import Posts from '../containers/Posts';
import NavBar from '../containers/navBar';
import SignUpPage from './SignUpPage';
import requireAuth from '../containers/requireAuth';

import '../style.scss';


const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={requireAuth(NewPost)} />
          <Route exact path="/posts/:postID" component={Post} />
          <Route path="/Login" component={SignUpPage} />
          <Route render={() => (<div>page not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
