import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  smallImageUrl,
  largeImageUrl,
  showImage,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={() => {
          showImage(largeImageUrl);
        }}
        src={smallImageUrl}
        alt=""
        className={css.ImageGalleryItem__image}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImageUrl: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  showImage: PropTypes.func.isRequired,
};
