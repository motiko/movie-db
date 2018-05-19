import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'unsemantic';
import { CardDeck } from 'reactstrap';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

class MoviesList extends PureComponent {
  static propTypes = {
    movies: PropTypes.array
  };

  static defaultProps = {
    movies: []
  };

  render() {
    const { movies, userId } = this.props;
    console.log(movies);
    return (
      <CardDeck>
        {movies.map(movie => (
          <Grid
            key={`${movie.id}_${userId}`}
            desktop="50"
            tablet="100"
            mobile="100"
          >
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </CardDeck>
    );
  }
}

export default connect(({ movies, userId }) => ({
  movies,
  userId
}))(MoviesList);
