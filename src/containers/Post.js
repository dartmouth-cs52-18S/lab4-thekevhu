import React, { Component } from 'react';
import marked from 'marked';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { fetchPost, updatePost, deletePost } from '../actions';


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.post.title,
      content: props.post.content,
      tags: props.post.tags,
      cover_url: props.post.cover_url,
      isEditing: false,
      newComment: '',
      commentsArray: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.updatePostChanges = this.updatePostChanges.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.renderCommentBox = this.renderCommentBox.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  componentWillReceiveProps(props) {
    console.log('here', props.post);

    this.setState({
      title: props.post.title,
      content: props.post.content,
      tags: props.post.tags.join(' '),
      cover_url: props.post.cover_url,
      commentsArray: props.post.commentsArray,
      isEditing: false,
    });
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
    } else if (id === 'newComment') {
      this.setState({ newComment: event.target.value });
    }
  }

  deletePost() {
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }

  updatePostChanges() {
    const post = {
      title: this.state.title,
      content: this.state.content,
      cover_url: this.state.cover_url,
      tags: this.state.tags.toString().split(' '),
    };

    this.setState({
      isEditing: false,
    });


    this.props.updatePost(this.props.match.params.postID, post);
  }

  submitComment() {
    console.log('newcom', this.state.newComment);
    this.state.commentsArray.push(this.state.newComment);
    console.log(this.state.commentsArray);
    const post = {
      commentsArray: this.state.commentsArray,
    };
    console.log(post.commentsArray);
    this.props.updatePost(this.props.match.params.postID, post);
  }

  renderEditButton() {
    if (this.state.isEditing) {
      return (
        <button id="editNodeButton" onClick={this.updatePostChanges}>update Post</button>
      );
    } else {
      return (
        <button id="editNodeButton" onClick={() => this.setState({ isEditing: true })}>Edit</button>
      );
    }
  }

  renderEditFields() {
    if (this.state.isEditing) {
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
        </div>
      );
    } else {
      let tagView = '';

      if (this.props.post.tags !== undefined) {
        tagView = this.props.post.tags.join(' ');
      }

      if (this.props.post.author) {
        console.log(this.props.post.author);
      }


      let email = '';
      if (this.props.post.author) {
        email = <div> {this.props.post.author.email} </div>;
      }

      return (
        <div id="node">
          <h3>{this.props.post.title}</h3>
          <h4> {email} </h4>
          <img alt={`${this.props.post.id}coverImage`} id="coverImage" src={this.props.post.cover_url} />
          <div dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
          <div>{tagView}</div>
        </div>
      );
    }
  }

  renderCommentBox() {
    console.log(this.props);
    if (this.props.authenticated) {
      return (
        <div id="commentsContainer">
          {/* eslint-disable */}
       {this.state.commentsArray.map((comment, index) => { return <p key={index} id="comment"> {comment} </p>; })}

       {/* eslint-enable */}
          <label htmlFor="newComment">
            <input id="newComment" className="inputField" onChange={this.onInputChange} value={this.state.newComment} />
          </label>
          <button id="submitComment" onClick={this.submitComment}> Submit Comment </button>
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    console.log(this.props.post);
    if (this.props.post) {
      return (
        <div>
          <div className="editNodeButtonContainer">
            <NavLink to="/">
              <button id="editNodeButton">
                Home Page
              </button>
            </NavLink>
            {this.renderEditButton()}
            <button id="editNodeButton" onClick={this.deletePost}>Delete</button>

          </div>
          {this.renderEditFields()}
          {this.renderCommentBox()}

        </div>
      );
    } else {
      return <div>Loading Post</div>;
    }
  }
}

const mapStateToProps = state => (
  {
    post: state.posts.post,
    authenticated: state.auth.authenticated,

  }
);

export default withRouter(connect(mapStateToProps, { fetchPost, updatePost, deletePost })(Post));
