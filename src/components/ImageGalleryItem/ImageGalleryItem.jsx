import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ smallImageUrl, largeImageUrl }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={smallImageUrl}
        alt={largeImageUrl}
        className={css.ImageGalleryItem__image}
      />
    </li>
  );
};
