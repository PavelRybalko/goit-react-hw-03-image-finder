import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { alt, url } = this.props.activeImage;

    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackDropClick}>
        <div className={s.Modal}>
          <img src={url} alt={alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  activeImage: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};
