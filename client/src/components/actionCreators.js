import { createAction } from 'redux-actions';
import MoviesService from '../MoviesService';

const logIn = createAction('LOGIN', MoviesService.login);
const logOut = createAction('LOGOUT', MoviesService.logout);
const setPage = createAction('SET_PAGE');
const fetchMovies = createAction(
  'FETCH_MOVIES',
  async ({ page, query, categories, minRating, maxRating }) => {
    const { movies, totalPages } = await MoviesService.list({
      page,
      query,
      categories,
      minRating,
      maxRating
    });
    return { movies, totalPages };
  }
);
export { logIn, logOut, setPage, fetchMovies };
