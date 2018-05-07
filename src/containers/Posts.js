import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { fetchPosts } from '../actions';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    if (this.props.posts) {
      console.log(this.props.posts);

      return (
        <div>
          {this.props.posts.map((post) => {
            return (
              <NavLink id="nodeContainer" key={post.id} to={`/posts/${post.id}`}>
                <div id="node">
                  <div>{post.title}</div>
                  <img alt={`${post.id}coverImage`} src={post.cover_url} />
                  <div>{post.tags.join(' ')}</div>
                </div>
              </NavLink>
            );
          })}
        </div>
      );
    } else {
      return <div>Loading Posts</div>;
    }
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts.all,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
