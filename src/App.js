import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/Container';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import pixabayApi from './services/pixabay-api';

export default class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    activeImage: {},
    showButton: false,
    showModal: false,
    showLoader: false,
    error: null,
    // status: 'idle',
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }
  // если возвращает false компонент не перерендеривается
  // или просто использовать PureComponent

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ showLoader: true });
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      images: [],
      page: 1,
      error: null,
    });
  };

  fetchImages = () => {
    const { page, searchQuery } = this.state;
    const options = { searchQuery, page };

    pixabayApi
      .fetchImages(options)
      .then(res => {
        const { hits, totalHits } = res;

        if (!!hits.length) {
          toast.success('Запрос выполнен успешно');
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            showButton: true,
            page: prevState.page + 1,
          }));
        }

        if (!hits.length) {
          toast.error(`По запросу "${searchQuery}" ничего не найдено`);
        }

        if (totalHits <= 12) {
          this.setState({ showButton: false });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({
          showLoader: false,
        });
        window.scrollTo({
          top: document.documentElement.offsetHeight,
          behavior: 'smooth',
        });
      });
  };

  openModal = ({ target }) => {
    const { largeimageurl } = target.dataset;
    const { alt } = target;
    this.setState({
      activeImage: {
        url: largeimageurl,
        alt: alt,
      },
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const {
      // status,
      images,
      showModal,
      showLoader,
      showButton,
      error,
      activeImage,
    } = this.state;

    // if(status === 'idle'){
    //   return <div>Please write something</div>
    // }
    // if(status === 'pending'){
    //   return <Loader/>
    // }
    // if(status === 'rejected'){
    //   return <h1>{error.message}</h1>;
    // }
    // if(status === 'resolved'){
    //   return <ImageGallery items={images} />
    // }

    return (
      <Container>
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <h1>{error.message}</h1>}

        {images && !error && (
          <ImageGallery items={images} onClick={this.openModal} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal} activeImage={activeImage} />
        )}

        {showLoader && <Loader />}
        {showButton && (
          <Button onClick={this.fetchImages} aria-label="Load More">
            Load More
          </Button>
        )}

        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
