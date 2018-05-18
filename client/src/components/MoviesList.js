import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'unsemantic';
import {
  Card,
  CardDeck,
  CardHeader,
  Badge,
  CardText,
  CardBody,
  CardSubtitle,
  ButtonGroup,
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import MovieRating from './MovieRating';

class MoviesList extends Component {
  static propTypes = {
    movies: PropTypes.array
  };

  static defaultProps = {
    movies: []
  };

  render() {
    const { movies, userEmail } = this.props;
    return (
      <CardDeck>
        {movies.map(movie => (
          <Grid
            key={`${movie.id}_${userEmail}`}
            desktop="50"
            tablet="100"
            mobile="100"
          >
            <Card style={{ marginTop: '1.5em' }}>
              <CardHeader>{movie.title}</CardHeader>
              <CardBody>
                <CardSubtitle>
                  <MovieRating
                    score={movie.score}
                    movieId={movie.id}
                    isEditable={!!userEmail}
                  />
                </CardSubtitle>
                {movie.category_name && (
                  <Badge
                    data-cy="movie-category"
                    style={{ marginBottom: '0.8em' }}
                  >
                    {' '}
                    {movie.category_name}
                  </Badge>
                )}
                <CardText>{movie.description}</CardText>
                {this.props.userEmail && (
                  <ButtonGroup>
                    <Button data-cy="edit-movie">Edit</Button>
                    <Button data-cy="delete-movie">Delete</Button>
                  </ButtonGroup>
                )}
              </CardBody>
            </Card>{' '}
          </Grid>
        ))}
      </CardDeck>
    );
  }
}

export default connect(({ movies, userEmail }) => ({
  movies,
  userEmail
}))(MoviesList);
