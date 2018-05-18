import { logIn, logOut, setPage, fetchMovies } from './actionCreators';
import { handleActions } from 'redux-actions';
import { loggedInUser } from '../MoviesService';

const defaultState = {
  userEmail: loggedInUser(),
  movies: [],
  totalPages: 1,
  curPage: 1
};
const reducer = handleActions(
  {
    [logIn](state, action) {
      return { ...state, userEmail: action.payload.authenticated };
    },
    [logOut](state) {
      return { ...state, userEmail: null };
    },
    [setPage](state, action) {
      return { ...state, curPage: action.payload };
    },
    [fetchMovies]: {
      next(state, action) {
        const { movies, totalPages } = action.payload;
        return { ...state, movies, totalPages };
      },
      throw(state, action) {
        return { ...state, movies: [], totalPages: 1 };
      }
    }
  },
  defaultState
);

export default reducer;
export { defaultState };
