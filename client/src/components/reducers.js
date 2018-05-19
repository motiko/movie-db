import * as action from './actionCreators';
import { handleActions } from 'redux-actions';
import { loggedInUser } from '../MoviesService';

const { userId, userEmail } = loggedInUser();
const defaultState = {
  userEmail,
  userId,
  movies: [],
  totalPages: 0,
  curPage: 0,
  message: '',
  messageColor: '',
  categories: []
};

const reducer = handleActions(
  {
    [action.listCategories](state, action) {
      if (!action.payload.categories) return state;
      return { ...state, categories: action.payload.categories };
    },
    [action.logIn](state, action) {
      const { userId, userEmail } = action.payload;
      return {
        ...state,
        userEmail,
        userId,
        message: `Welcome ${userEmail}`,
        messageColor: 'success'
      };
    },
    [action.createMovie]: {
      next(state, action) {
        if (action.payload.errors) return state;
        return {
          ...state,
          movies: [action.payload.movie, ...state.movies],
          message: 'Movie created succesfully',
          messageColor: 'success'
        };
      },
      throw(state, action) {
        return {
          ...state,
          message: `Unexpected error occured: ${action.payload.message}`,
          messageColor: 'danger'
        };
      }
    },
    [action.logOut](state) {
      return {
        ...state,
        userEmail: null,
        userId: null,
        message: 'Bye bye',
        messageColor: 'success'
      };
    },
    [action.setPage](state, action) {
      return { ...state, curPage: action.payload };
    },
    [action.deleteMovie]: {
      next(state, action) {
        return {
          ...state,
          movies: state.movies.filter(m => m.id !== action.payload.movieId)
        };
      },
      throw(state, action) {
        return {
          ...state,
          message: 'Could not remove movie',
          messageColor: 'danger'
        };
      }
    },
    [action.fetchMovies]: {
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
