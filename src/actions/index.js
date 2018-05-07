import axios from 'axios';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
};

const ROOT_URL = 'http://localhost:9090/api';

// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=kevin_hu';


export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      }).catch((error) => {
        console.log('Unable to fetch posts');
        console.log(error);
      });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}/`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      }).catch((error) => {
        console.log('Unable to fetch post');
        console.log(error);
      });
  };
}

export function createPost(post, history) {
  console.log('hello');

  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post)
      .then((response) => {
        console.log('hello2');

        dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
        history.push('/');
      }).catch((error) => {
        console.log('Unable to create post');
        console.log(error);
      });
  };
}

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}/`, post)
      .then((response) => {
        console.log(response);
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      }).catch((error) => {
        console.log('Unable to update post');
        console.log(error);
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}/`)
      .then((response) => {
        dispatch({ type: ActionTypes.DELETE_POST, payload: null });
        history.push('/');
      }).catch((error) => {
        console.log('Unable to delete post');
        console.log(error);
      });
  };
}
