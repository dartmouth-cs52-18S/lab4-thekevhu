import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createPost } from '../actions';
import uploadImage from '../actions/s3';


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
    this.onImageUpload = this.onImageUpload.bind(this);
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      this.setState({ preview: window.URL.createObjectURL(file), file });
    }
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
    if (this.state.file) {
      uploadImage(this.state.file).then((url) => {
        console.log(url);
        // use url for content_url and
        // either run your createPost actionCreator
        // or your updatePost actionCreator
        this.setState({ cover_url: url });
        this.props.createPost(Object.assign({}, this.state), this.props.history);
      }).catch((error) => {
        // handle error
      });
    }
  }

  render() {
    return (
      <div >
        <form id="inputContainer" className="nodeFieldContainer">
          <label htmlFor="title">Title
            <input id="title" className="inputField" onChange={this.onInputChange} value={this.state.title} />
          </label>
          <img id="preview" alt="preview" src={this.state.preview} />
          <input type="file" name="coverImage" onChange={this.onImageUpload} />
          <label htmlFor="content">Content
            <input id="content" className="inputField" onChange={this.onInputChange} value={this.state.content} />
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
