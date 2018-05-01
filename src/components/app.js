import React from 'react';
import { Switch, BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import NewPost from '../containers/newPost';
import Post from '../containers/Post';
import Posts from '../containers/Posts';

import '../style.scss';

const Nav = (props) => {
  return (
    <nav id="navBar">
      <ul id="navBarItems">
        <li><NavLink exact to="/">A Blog of Bob the Blob</NavLink></li>
        <li><NavLink to="/posts/new">Add Post</NavLink></li>
      </ul>
    </nav>
  );
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route exact path="/posts/:postID" component={Post} />

          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
