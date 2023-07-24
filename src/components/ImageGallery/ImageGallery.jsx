import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  showLargeImage = largeImageUrl => {
    this.props.setUrlLargeImage(largeImageUrl);
  };

  render() {
    return (
      <ul className={css.ImageGallery}>
        {this.props.images.map(item => {
          return (
            <ImageGalleryItem
              key={item.id}
              smallImageUrl={item.webformatURL}
              largeImageUrl={item.largeImageURL}
              showImage={this.showLargeImage}
            />
          );
        })}
      </ul>
    );
  }
}
ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  setUrlLargeImage: PropTypes.func.isRequired,
  setAppState: PropTypes.func.isRequired,
};
