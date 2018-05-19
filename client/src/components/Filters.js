import React, { PureComponent } from 'react';
import { Input, NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchMovies, setPage } from './actionCreators';
import CategoriesFilter from './CategoriesFilter';
import RatingFilter from './RatingFilter';

class Navigation extends PureComponent {
  state = {
    searchQuery: '',
    categories: [],
    minRating: 1,
    maxRating: 5
  };

  componentDidMount() {
    this.props.fetchMovies({ page: this.props.curPage });
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.fetchMovies({
      page: this.props.curPage,
      query: this.state.searchQuery,
      categories: this.state.categories,
      minRating: this.state.minRating,
      maxRating: this.state.maxRating
    });
  }

  toggleLoginDialog = () => {
    this.setState(prevState => ({
      loginDialogOpen: !prevState.loginDialogOpen
    }));
  };

  toggleMovieDialog = () => {
    this.setState(prevState => ({
      movieDialogOpen: !prevState.movieDialogOpen
    }));
  };

  updateQuery = event => {
    if (event.type === 'blur')
      this.setState({ searchQuery: event.target.value });
    if (
      event.type === 'keypress' &&
      (event.key === ' ' || event.key === 'Enter')
    )
      this.setState({ searchQuery: event.target.value });
  };

  updateCategories = categories => {
    this.setState({ categories });
    this.props.setPage(1);
  };

  updateRatings = (min, max) => {
    this.setState({ minRating: min, maxRating: max });
    this.props.setPage(1);
  };

  render() {
    return (
      <React.Fragment>
        <NavItem>
          <Input
            name="search"
            id="searchText"
            placeholder="Search"
            onKeyPress={this.updateQuery}
            onBlur={this.updateQuery}
          />
        </NavItem>
        <RatingFilter onUpdate={this.updateRatings} />
        <CategoriesFilter onUpdate={this.updateCategories} />
      </React.Fragment>
    );
  }
}

export default connect(({ curPage }) => ({ curPage }), {
  fetchMovies,
  setPage
})(Navigation);
