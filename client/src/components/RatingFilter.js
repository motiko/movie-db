import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import enhanceWithClickOutside from 'react-click-outside';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';

class RatingFilter extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired
  };

  state = {
    min: 1,
    max: 5,
    isOpen: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { min, max } = this.state;
    if (prevState.min !== min || prevState.max !== max) {
      this.props.onUpdate(min, max);
    }
  }

  updateMax = newMax => {
    if (newMax < this.state.min) {
      this.setState({ min: newMax, max: newMax });
    } else {
      this.setState({ max: newMax });
    }
  };

  updateMin = newMin => {
    if (newMin > this.state.max) {
      this.setState({ min: newMin, max: newMin });
    } else {
      this.setState({ min: newMin });
    }
  };

  handleClickOutside = () => {
    this.setState({ isOpen: false });
  };

  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { min, max, isOpen } = this.state;
    return (
      <Dropdown nav inNavbar isOpen={isOpen} toggle={() => {}}>
        <DropdownToggle nav caret onClick={this.toggle}>
          Rating
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <h6 className="text-muted float-left select-rating-label">From </h6>
            <StarRatingComponent
              name={'min'}
              starCount={5}
              value={min}
              starColor="#ffd700"
              onStarClick={this.updateMin}
              editing={true}
              className="float-right"
            />{' '}
          </DropdownItem>
          <DropdownItem>
            <h6
              style={{ marginBottom: '0px', marginTop: '3px' }}
              className="text-muted float-left select-rating-label"
            >
              To{' '}
            </h6>
            <StarRatingComponent
              name={'max'}
              starCount={5}
              value={max}
              starColor="#ffd700"
              onStarClick={this.updateMax}
              editing={true}
              className="float-right"
            />{' '}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default enhanceWithClickOutside(RatingFilter);
