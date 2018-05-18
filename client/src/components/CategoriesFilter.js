import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import MoviesService from '../MoviesService';
import enhanceWithClickOutside from 'react-click-outside';
import PropTypes from 'prop-types';

class CategoriesFilter extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired
  };

  state = {
    categories: [],
    selectedIds: [],
    isOpen: false
  };

  componentDidMount() {
    MoviesService.listCategories()
      .then(({ categories }) => {
        this.setState({ categories: categories });
      })
      .catch(er => {
        this.setState({ categories: [] });
      });
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
    const { selectedIds, categories, isOpen } = this.state;
    return (
      <Dropdown nav inNavbar isOpen={isOpen} toggle={() => {}}>
        <DropdownToggle nav caret onClick={this.toggle}>
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

export default enhanceWithClickOutside(CategoriesFilter);
