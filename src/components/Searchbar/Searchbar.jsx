import React, { Component } from "react";
import s from "./Searchbar.module.css";
import { ReactComponent as SearchSvg } from "../../icons/search.svg";
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    value: "",
  };

  static propTypes = {
    giveDataToApp: PropTypes.func.isRequired,
  }

  inputHandler = e => {
      this.setState({value: e.currentTarget.value})
  }

  submitHandler = e => {
      e.preventDefault();

      this.props.giveDataToApp(this.state.value)
      this.setState({value: ''})
  }
  render() {
    const { value } = this.state;
    const {inputHandler, submitHandler} = this;

    return (

<header className={s.Searchbar}>
<form className={s.SearchForm} onSubmit={submitHandler}>
  <button type="submit" className={s.button}>
    <span className="s.label">Search</span>
  </button>

  <input
    className={s.input}
    type="text"
    autoComplete="off"
    autoFocus
    placeholder="Search images and photos"
    onChange={inputHandler}
  />
</form>
</header>
    );
  }
}

export default Searchbar;
