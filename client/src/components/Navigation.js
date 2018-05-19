import React, { PureComponent } from 'react';
import {
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
import { connect } from 'react-redux';
import LoginDialog from './LoginDialog';
import MovieDialog from './MovieDialog';
import Filters from './Filters';
import { logOut } from './actionCreators';

function Logo() {
  return (
    <h1 className="logo">
      {' '}
      <img alt="MovieDB" src="/movie_folder.png" /> MovieDB
    </h1>
  );
}

class Navigation extends PureComponent {
  state = {
    loginDialogOpen: false,
    movieDialogOpen: false
  };

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

  render() {
    const { isLoading, userEmail } = this.props;
    const { loginDialogOpen, movieDialogOpen } = this.state;
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={() => <Logo />} href="/" />
        {isLoading && <Spinner color="darkblue" size="24px" />}
        <Nav className="ml-auto" navbar>
          <Filters />
          {userEmail ? (
            <React.Fragment>
              <NavItem>
                <NavLink
                  data-cy="open-movie-dialog"
                  onClick={this.toggleMovieDialog}
                >
                  ＋Add Movie
                </NavLink>
              </NavItem>
              <MovieDialog
                isOpen={movieDialogOpen}
                onToggle={this.toggleMovieDialog}
              />
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {userEmail}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.props.logOut}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </React.Fragment>
          ) : (
            <NavItem>
              <NavLink onClick={this.toggleLoginDialog}>Login</NavLink>
              <LoginDialog
                isOpen={loginDialogOpen}
                onToggle={this.toggleLoginDialog}
              />
            </NavItem>
          )}
        </Nav>
      </Navbar>
    );
  }
}

export default connect(({ userEmail }) => ({ userEmail }), {
  logOut
})(Navigation);
