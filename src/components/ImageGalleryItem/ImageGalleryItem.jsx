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
