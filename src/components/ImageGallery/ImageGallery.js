import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ items, onClick }) => (
  <ul className={s.ImageGallery}>
    {items.map(item => (
      <ImageGalleryItem key={item.id} item={item} onClick={onClick} />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default ImageGallery;
