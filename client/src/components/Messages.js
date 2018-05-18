import { Alert } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Messages extends Component {
  static propTypes = {
    message: PropTypes.string,
    color: PropTypes.string
  };

  static defaultProps = {
    message: '',
    color: 'light'
  };

  state = { visible: true, lastMessage: '' };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.message !== prevState.lastMessage) {
      return { visible: true, lastMessage: nextProps.message };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    clearTimeout(this.timerHandler);
    if (this.state.visible) this.timerHandler = setTimeout(this.hide, 3000);
  }

  hide = () => {
    clearTimeout(this.timerHandler);
    this.setState({ visible: false });
  };

  render() {
    const { message, color } = this.props;
    const { visible } = this.state;
    return (
      message !== '' && (
        <Alert
          toggle={this.hide}
          isOpen={visible}
          className="message"
          color={color}
          data-cy="global-message"
        >
          {this.props.message}
        </Alert>
      )
    );
  }
}

export default connect(
  ({ message, messageColor }) => ({ message, color: messageColor }),
  {}
)(Messages);
