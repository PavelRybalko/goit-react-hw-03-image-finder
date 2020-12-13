import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = ({ target: { value } }) =>
    this.setState({ query: value.toLowerCase() });

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      return toast.error('Введите слово для поиска');
    }

    this.props.onSubmit(this.state.query);
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.query}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
