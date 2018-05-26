import { ActionTypes } from '../actions';

const initialState = {
  error: '',
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
};

export default ErrorReducer;
