import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { listCategories } from './actionCreators';
import enhanceWithClickOutside from 'react-click-outside';
import PropTypes from 'prop-types';

class CategoriesFilter extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    categories: PropTypes.array
  };

  static defaultProps = {
    categories: []
  };
  state = {
    selectedIds: [],
    isOpen: false
  };

  componentDidMount() {
    this.props.listCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedIds.length !== prevState.selectedIds.length) {
      this.props.onUpdate(this.state.selectedIds);
    }
  }

  onCategoryClick = (categoryId, event) => {
    this.setState(({ selectedIds: previousIds }) => {
      if (previousIds.includes(categoryId)) {
        return { selectedIds: previousIds.filter(id => id !== categoryId) };
      } else {
        return { selectedIds: [...previousIds, categoryId] };
      }
    });
  };

  handleClickOutside = () => {
    this.setState({ isOpen: false });
  };

  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { selectedIds, isOpen } = this.state;
    const { categories } = this.props;
    return (
      <Dropdown nav inNavbar isOpen={isOpen} toggle={() => {}}>
        <DropdownToggle
          nav
          caret
          onClick={this.toggle}
          disabled={categories.length === 0}
        >
          Category
        </DropdownToggle>
        <DropdownMenu right>
          {categories.map(category => (
            <DropdownItem
              data-cy="category-filter"
              key={category.id}
              onClick={event => this.onCategoryClick(category.id, event)}
              className={
                selectedIds.includes(category.id) ? 'selected' : 'not-selected'
              }
            >
              {category.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default connect(state => ({ categories: state.categories }), {
  listCategories
})(enhanceWithClickOutside(CategoriesFilter));
