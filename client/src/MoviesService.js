const json = response => response.json();

const present = obj => obj !== undefined && obj !== null;

function headers(authorize = true) {
  const token = localStorage.getItem('token');
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  };
  if (token && authorize) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

function list({ page, query, categories, minRating, maxRating }) {
  let path = `/movie?page=${page || 1}`;
  if (query) path += `&query=${query}`;
  if (categories) path += categories.map(c => `&categories[]=${c}`);
  if (present(minRating)) path += `&min_rating=${minRating}`;
  if (present(maxRating)) path += `&max_rating=${maxRating}`;
  return fetch(path, { headers: headers(false), method: 'GET' })
    .then(checkErrors)
    .then(slidingSession)
    .then(json)
    .then(({ movies, page, per_page: perPage, total }) => {
      const totalPages = parseInt(total / perPage, 10);
      return {
        movies,
        totalPages
      };
    });
}

function listCategories() {
  return fetch('/category')
    .then(checkErrors)
    .then(json)
    .then(({ categories }) => ({
      categories
    }));
}

function login(email, password) {
  return fetch('/user_token', {
    headers: headers(),
    method: 'POST',
    body: JSON.stringify({ auth: { email, password } })
  })
    .then(checkErrors)
    .then(json)
    .then(({ jwt }) => {
      localStorage.setItem('token', jwt);
      localStorage.setItem('email', email);
      //Helping password managers to Make sure form submission is clear https://www.chromium.org/developers/design-documents/create-amazing-password-forms
      window.history.pushState({}, 'login');
      return { authenticated: email };
    })
    .catch(error => {
      if (error.number === 404)
        return { error: 'Please check your email and password.' };
      return { error: 'Unexpected server error.' };
    });
}

function rate(movieId, score) {
  return fetch(`/movie/${movieId}/rate`, {
    headers: headers(),
    method: 'PATCH',
    body: JSON.stringify({ score: score })
  }).then(checkErrors);
}

function logout() {
  localStorage.removeItem('email');
  localStorage.removeItem('token');
}

function loggedInUser() {
  return localStorage.getItem('email');
}

function checkErrors(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    logout();
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.number = response.status;
  error.response = response;
  throw error;
}

function slidingSession(response) {
  if (response.headers && response.headers['Authorization']) {
    localStorage.setItem('token', response.headers['Authorization']);
  }
  return response;
}

const MoviesService = { list, login, logout, rate, listCategories };

export default MoviesService;

export { loggedInUser };
