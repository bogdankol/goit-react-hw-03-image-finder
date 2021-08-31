import React, { Component } from "react";
import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";
import Loader from "../Loader";
import Modal from "../Modal";
import Button from "../Button";
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    modal: false,
    url: "",
    imagesArray: [],
    page: 1,
    error: null,
    status: "idle",
    isLoading: false,
  };

  static propTypes = {
    query: PropTypes.string,
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { query } = this.props;

    if (prevProps.query !== this.props.query) {
      this.setState({ page: 1, imagesArray: [] });
      this.fetch(query, page);
    }
    if (prevState.page !== this.state.page) {
      this.fetch(query, this.state.page);
    }
  }

  fetch(query, page) {
    this.setState({ isLoading: true });
    const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=22223449-0f7605970ab6351a0732adfe1&image_type=photo&orientation=horizontal&per_page=12`;
    return fetch(URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(
            `there are some problems with server or your input is bizarre.`
          )
        );
      })
      .then((result) => {
        if (result.hits.length > 0) {
          return this.setState((prevState) => ({
            imagesArray: [...prevState.imagesArray, ...result.hits],
            status: "resolved",
            isLoading: false,
          }));
        }
        this.setState({ status: "idle", isLoading: false });
        return alert("there are no results!");
      })
      .catch((err) => this.setState({ status: "rejected", error: err }));
  }

  onClickHandler = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
  };

  onClick = (e) => {
    this.setState({ url: e.target.dataset.largeurl, modal: true });
  };

  closeModal = (e) => {
    this.setState({ modal: false });
  };

  render() {
    const { modal, url, imagesArray, error, status, isLoading } =
      this.state;
    const { onClick, closeModal, onClickHandler } = this;

    return (
      <div>
        {status === "rejected" && (
          <div className={s.div}>
            <h2>{error.message}</h2>
          </div>
        )}

        {status === "resolved" && (
          <div className={s.div}>
            <ul className={s.list}>
              <ImageGalleryItem
                array={imagesArray}
                onClick={onClick}
                onClose={closeModal}
              />
            </ul>
            {isLoading && <Loader />}
            {imagesArray.length >= 12 && (
              <Button onButtonClick={onClickHandler} />
            )}
          </div>
        )}

        {modal && <Modal src={url} onCloseModalWindow={closeModal} />}
      </div>
    );
  }
}

export default ImageGallery;
