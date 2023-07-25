import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }
  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.closeOverlay}>
        <div className={css.Modal}>
          <img src={this.props.largeImageUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
