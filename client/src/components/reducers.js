import { logIn, logOut, setPage, fetchMovies } from './actionCreators';
import { handleActions } from 'redux-actions';
import { loggedInUser } from '../MoviesService';

const defaultState = {
  userEmail: loggedInUser(),
  movies: [],
  totalPages: 0,
  curPage: 0,
  message: '',
  messageColor: ''
};

const reducer = handleActions(
  {
    [logIn](state, action) {
      const userEmail = action.payload.authenticated;
      return {
        ...state,
        userEmail,
        message: `Welcome ${userEmail}`,
        messageColor: 'success'
      };
    },
    [logOut](state) {
      return {
        ...state,
        userEmail: null,
        message: 'Bye bye',
        messageColor: 'success'
      };
    },
    [setPage](state, action) {
      return { ...state, curPage: action.payload };
    },
    [fetchMovies]: {
      next(state, action) {
        const { movies, totalPages, message } = action.payload;
        if (message)
          return {
            ...state,
            movies,
            totalPages,
            message,
            messageColor: 'info'
          };
        return { ...state, movies, totalPages };
      },
      throw(state, action) {
        return {
          ...state,
          movies: [],
          totalPages: 0,
          message: action.payload.message,
          messageColor: 'danger'
        };
      }
    }
  },
  defaultState
);

export default reducer;
export { defaultState };
