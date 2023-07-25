import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  onSubmitForm = evt => {
    const { inputValue } = this.state;
    const { setAppState } = this.props;
    evt.preventDefault();
    if (inputValue === '' || inputValue === this.props.searchValue) {
      return;
    }
    setAppState(inputValue.trim().toLowerCase());
  };

  onChangeInput = evt => {
    return this.setState({ inputValue: evt.target.value });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmitForm}>
          <button type="submit" className={css.SearchForm__button}>
            <span className={css.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={css.SearchForm__input}
            type="text"
            name="search"
            value={this.state.inputValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeInput}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  setAppState: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};
