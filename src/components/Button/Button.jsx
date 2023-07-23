// import React, { Component } from 'react';
import css from './Button.module.css';

export const Button = ({ Click }) => {
  return (
    <button type="button" className={css.Button} onClick={Click}>
      Load more
    </button>
  );
};
