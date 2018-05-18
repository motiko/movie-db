import MoviesService from '../MoviesService';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

class MovieRating extends Component {
  static propTypes = {
    score: PropTypes.number,
    movieId: PropTypes.number.isRequired,
    isEditable: PropTypes.bool
  };

  static defaultProps = {
    score: 0,
    isEditable: false
  };

  constructor(props) {
    super(props);
    this.state = {
      score: props.score,
      editable: props.isEditable,
      submitted: false
    };
  }

  rate = newScore => {
    this.setState({ score: newScore, editable: false });
    MoviesService.rate(this.props.movieId, newScore).then(() => {
      this.setState({ submitted: true });
    });
  };

  render() {
    const { movieId, editable, submitted, score } = this.state;
    return (
      <React.Fragment>
        <StarRatingComponent
          name={'rate' + movieId}
          starCount={5}
          value={score}
          starColor="#ffd700"
          onStarClick={this.rate}
          editing={editable}
        />
        {submitted && (
          <span className="sumbittedRating">{'\u{2713} Submitted'}</span>
        )}
      </React.Fragment>
    );
  }
}

export default MovieRating;
