import React, { PureComponent } from 'react';
import {
  Input,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Spinner from 'react-svg-spinner';
import LoginDialog from './LoginDialog';
import { connect } from 'react-redux';
import { logOut, fetchMovies, setPage } from './actionCreators';
import CategoriesFilter from './CategoriesFilter';
import RatingFilter from './RatingFilter';

function Logo() {
  return (
    <h1 className="logo" style={{ color: 'grey', fontSize: '2.1rem' }}>
      {' '}
      <img alt="MovieDB" src="/movie_folder.png" /> MovieDB
    </h1>
  );
}

class Navigation extends PureComponent {
  state = {
    dialogOpen: false,
    searchQuery: '',
    categories: [],
    minRating: 1,
    maxRating: 5
  };

  componentDidMount() {
    this.props.fetchMovies({ page: this.props.curPage });
  }

  componentDidUpdate() {
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
      dialogOpen: !prevState.dialogOpen
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
    const { isLoading, userEmail } = this.props;
    const { dialogOpen } = this.state;
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={() => <Logo />} href="/" />
        {isLoading && <Spinner color="darkblue" size="24px" />}
        <Nav className="ml-auto" navbar>
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
          {userEmail ? (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {userEmail}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.props.logOut}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <NavItem>
              <NavLink onClick={this.toggleLoginDialog}>Login</NavLink>
              <LoginDialog
                isOpen={dialogOpen}
                onToggle={this.toggleLoginDialog}
              />
            </NavItem>
          )}
        </Nav>
      </Navbar>
    );
  }
}

export default connect(({ userEmail, curPage }) => ({ userEmail, curPage }), {
  logOut,
  fetchMovies,
  setPage
})(Navigation);
