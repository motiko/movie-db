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
import PropTypes from 'prop-types';
import { createMovie } from './actionCreators';
import { connect } from 'react-redux';

class MovieDialog extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func,
    categories: PropTypes.array
  };

  static defaultProps = {
    isOpen: false,
    categories: []
  };

  static defaultState = {
    title: '',
    description: '',
    category: '',
    errors: []
  };

  state = MovieDialog.defaultState;
  titleInput = null;

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) this.focusTitle();
  }

  componentDidMount() {
    const { categories } = this.props;
    if (categories && categories.length > 0)
      this.setState({ category: categories[0] });
    this.focusTitle();
  }

  focusTitle = () => {
    if (this.titleInput) this.titleInput.focus();
  };

  setTitleInput = element => {
    this.titleInput = element;
  };

  onChange = attr => event => {
    this.setState({ [attr]: event.target.value });
  };

  toggleState = () => {
    this.setState(MovieDialog.defaultState);
    this.props.onToggle();
  };

  onSaveClick = event => {
    event.preventDefault();
    const { title, description, category } = this.state;
    this.props.createMovie(title, description, category).then(({ payload }) => {
      if (payload.errors) {
        this.setState({ errors: payload.errors });
      } else {
        this.props.onToggle();
      }
    });
  };

  render() {
    const { isOpen, categories } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={this.toggleState}>
        <ModalHeader>Movie</ModalHeader>
        <Form>
          <ModalBody>
            <FormGroup>
              <Label for="titleInput">Title</Label>
              <Input
                innerRef={this.setTitleInput}
                type="text"
                name="title"
                id="titleInput"
                onChange={this.onChange('title')}
              />
            </FormGroup>
            <FormGroup>
              <Label for="descriptionInput">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="descriptionInput"
                onChange={this.onChange('description')}
              />
            </FormGroup>
            <Label for="descriptionInput">Category</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={this.onChange('category')}
            >
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}{' '}
            </Input>
            {this.state.errors &&
              this.state.errors.map(error => (
                <Alert color="danger" key={error}>
                  {error}
                </Alert>
              ))}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={this.onSaveClick}>
              Save
            </Button>{' '}
            <Button color="secondary" onClick={this.toggleState}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default connect(state => ({ categories: state.categories }), {
  createMovie
})(MovieDialog);
