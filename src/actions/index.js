import axios from 'axios';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};


// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://thekevhu-lab5pt2.herokuapp.com/api';

// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
// const ROOT_URL = 'https://thekevhu-lab5.herokuapp.com/api';

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
        console.log('here', response);
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
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post, { headers: { authorization: localStorage.getItem('token') } })
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
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}/`, post, { headers: { authorization: localStorage.getItem('token') } })
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
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}/`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.DELETE_POST, payload: null });
        history.push('/');
      }).catch((error) => {
        console.log('Unable to delete post');
        console.log(error);
      });
  };
}


// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      dispatch(authError(`Sign In Failed: ${error.response}`));
    });
  };
}


export function signupUser({ email, password, author }, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    console.log({ email, password, author });
    axios.post(`${ROOT_URL}/signup`, { email, password, author }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      console.log(response.data.token);
      history.push('/');
    }).catch((error) => {
      dispatch(authError(`Sign Up Failed: ${error.response}`));
    });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
