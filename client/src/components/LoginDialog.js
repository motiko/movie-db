import React, { Component } from 'react';
import {
  Input,
  Form,
  Button,
  Modal,
  FormGroup,
  Label,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap';
import { logIn } from './actionCreators';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoginDialog extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func
  };

  static defaultProps = {
    isOpen: false
  };
  static defaultState = { email: '', password: '', errorMessage: null };
  state = LoginDialog.defaultState;
  emailInput = null;

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) this.focusEmail();
  }

  componentDidMount() {
    this.focusEmail();
  }

  focusEmail = () => {
    if (this.emailInput) this.emailInput.focus();
  };

  setEmailInput = element => {
    this.emailInput = element;
  };

  onChange = attr => event => {
    this.setState({ [attr]: event.target.value });
  };

  onLoginClick = event => {
    event.preventDefault();
    this.props
      .logIn(this.state.email, this.state.password)
      .then(({ payload }) => {
        if (payload.error) {
          this.setState({ errorMessage: payload.error });
        } else {
          this.props.onToggle();
        }
      });
  };

  toggleState = () => {
    this.setState(LoginDialog.defaultState);
    this.props.onToggle();
  };

  render() {
    const { isOpen } = this.props;
    return (
      <React.Fragment>
        <Modal isOpen={isOpen} toggle={this.toggleState}>
          <ModalHeader>Login</ModalHeader>
          <Form>
            <ModalBody>
              <FormGroup>
                <Label for="emailInput">Email</Label>
                <Input
                  innerRef={this.setEmailInput}
                  type="email"
                  name="email"
                  id="emailInput"
                  autoComplete="username"
                  onChange={this.onChange('email')}
                />
              </FormGroup>
              <FormGroup>
                <Label for="passwordInput">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="passwordInput"
                  autoComplete="current-password"
                  onChange={this.onChange('password')}
                />
              </FormGroup>
              {this.state.errorMessage && (
                <Alert color="danger">{this.state.errorMessage}</Alert>
              )}
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={this.onLoginClick}>
                Login
              </Button>{' '}
              <Button color="secondary" onClick={this.toggleState}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(null, { logIn })(LoginDialog);
