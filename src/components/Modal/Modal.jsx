import React, { Component } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#root_modal');

export class Modal extends Component {
  closeModal = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  closeOverlay = e => {
    if (e.target.nodeName !== 'IMG') {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
    window.addEventListener('click', this.closeOverlay);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
    window.removeEventListener('click', this.closeOverlay);
  }
  render() {
    return createPortal(
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.largeImageUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
