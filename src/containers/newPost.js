import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createPost } from '../actions';


class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      cover_url: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  onInputChange(event) {
    const { id } = event.target;

    if (id === 'title') {
      this.setState({ title: event.target.value });
    } else if (id === 'content') {
      this.setState({ content: event.target.value });
    } else if (id === 'tags') {
      this.setState({ tags: event.target.value });
    } else if (id === 'cover_url') {
      this.setState({ cover_url: event.target.value });
    }
  }

  createPost() {
    if (this.state.title !== '' && this.state.content !== '' && this.state.tags !== '' && this.state.cover_url !== '') {
      this.props.createPost(Object.assign({}, this.state), this.props.history);
    } else {
      alert('please fill out all fields');
    }
  }

  render() {
    return (
      <div >
        <form id="inputContainer" className="nodeFieldContainer">
          <label htmlFor="title">Title
            <input id="title" className="inputField" onChange={this.onInputChange} value={this.state.title} />
          </label>
          <label htmlFor="content">Content
            <input id="content" className="inputField" onChange={this.onInputChange} value={this.state.content} />
          </label>
          <label htmlFor="cover_url">Cover Url
            <input id="cover_url" className="inputField" onChange={this.onInputChange} value={this.state.cover_url} />
          </label>
          <label htmlFor="tags">Tags
            <input id="tags" className="inputField" onChange={this.onInputChange} value={this.state.tags} />
          </label>
        </form>
        <button id="createNodeButton" onClick={this.createPost}> Create Post </button>
      </div>
    );
  }
}

export default withRouter(connect(null, { createPost })(NewPost));
