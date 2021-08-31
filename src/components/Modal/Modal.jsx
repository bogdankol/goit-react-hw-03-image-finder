import React, { Component } from "react";
import s from './Modal.module.css';
import { createPortal } from "react-dom";
import PropTypes from "prop-types";


const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {

    static propTypes = {
        src: PropTypes.string,
        onCloseModalWindow: PropTypes.func,
    }
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
      }
      componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
      }
      handleKeyDown = e => {
        if (e.code === 'Escape') {
          this.props.onCloseModalWindow(e);
        }
      };
      handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
          this.props.onCloseModalWindow(e);
        }
      };
  render() {
    return (
    createPortal(<div className={s.overlay} onClick={this.handleBackdropClick}>
          <div className={s.modal}>
            <img src={this.props.src} alt="bigImage" />
          </div>
        </div>,
        modalRoot)
    )}
}

export default Modal;
