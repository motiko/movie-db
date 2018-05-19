import { createAction } from 'redux-actions';
import MoviesService from '../MoviesService';

const logIn = createAction('LOGIN', MoviesService.login);
const logOut = createAction('LOGOUT', MoviesService.logout);
const deleteMovie = createAction('DELETE_MOVIE', MoviesService.deleteMovie);
const createMovie = createAction('CREATE_MOVIE', MoviesService.createMovie);
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
    let message = '';
    if (movies.length === 0) {
      if (query) {
        message = `No movies found for ${query}`;
      } else if (categories.length > 0) {
        message = `No movies found in selected categories `;
      } else if (minRating || maxRating) {
        message = `No movies found with selected score`;
      } else {
        message = `No movies found`;
      }
    }
    return { movies, totalPages, message };
  }
);
export { logIn, logOut, setPage, fetchMovies, deleteMovie, createMovie };
