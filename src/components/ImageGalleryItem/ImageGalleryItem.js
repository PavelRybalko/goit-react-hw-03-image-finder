import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item, onClick }) => (
  <li className={s.ImageGalleryItem}>
    <img
      onClick={e => {
        onClick(e);
      }}
      data-largeimageurl={item.largeImageURL}
      src={item.webformatURL}
      alt={item.tags}
      className={s.image}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
