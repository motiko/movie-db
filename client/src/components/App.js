import React, { Component } from 'react';
import Navigation from './Navigation';
import MoviesList from './MoviesList';
import { Grid, GridContainer } from 'unsemantic';
import MoviesPagination from './MoviesPagination';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { Provider } from 'react-redux';
import appReducer, { defaultState } from './reducers';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <GridContainer>
          <Grid desktop="100">
            <MoviesPagination />
          </Grid>
          <MoviesList />
        </GridContainer>
      </div>
    );
  }
}

const store = createStore(
  appReducer,
  defaultState,
  applyMiddleware(promiseMiddleware)
);
const ProvidedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ProvidedApp;
