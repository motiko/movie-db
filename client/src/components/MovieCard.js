import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
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
import { deleteMovie } from './actionCreators';

class MovieCard extends Component {
  static propTypes = {
    userId: PropTypes.number,
    deleteMovie: PropTypes.func
  };

  render() {
    const { movie, userId, deleteMovie } = this.props;
    return (
      <Card className="movie-card">
        <CardHeader>{movie.title}</CardHeader>
        <CardBody>
          <CardSubtitle>
            <MovieRating
              score={movie.score}
              movieId={movie.id}
              isEditable={userId !== null}
            />
          </CardSubtitle>
          {movie.category_name && (
            <Badge data-cy="movie-category"> {movie.category_name}</Badge>
          )}
          <CardText>{movie.description}</CardText>
          {this.props.userId === movie.user_id && (
            <ButtonGroup>
              <Button data-cy="edit-movie">Edit</Button>
              <Button
                data-cy="delete-movie"
                onClick={() => deleteMovie(movie.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          )}
        </CardBody>
      </Card>
    );
  }
}

export default connect(
  ({ userId }) => ({
    userId
  }),
  { deleteMovie }
)(MovieCard);
