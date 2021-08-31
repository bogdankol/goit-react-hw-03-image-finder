import React, { Component } from "react";
import s from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

class ImageGalleryItem extends Component {
  static propTypes = {
    array: PropTypes.array,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
  };

  onClickHandler = (e) => {
    this.props.onClick(e);
  };

  render() {
    const { array } = this.props;
    const { onClickHandler, onCloseModal } = this;
    return array.map((el) => (
      <li key={el.id} className={s.item} onClick={onClickHandler}>
        <img
          src={el.webformatURL}
          alt={el.tags}
          className={s.img}
          data-largeurl={el.largeImageURL}
        ></img>
      </li>
    ));
  }
}

export default ImageGalleryItem;
