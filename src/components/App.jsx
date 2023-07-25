import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchData } from 'services/fetch-api';

Notify.init({
  width: '300px',
  fontSize: '18px',
  position: 'center-top',
  timeout: '3000',
  messageMaxLength: 150,
  distance: '20px',
  showOnlyTheLastOne: true,
  warning: {
    background: '#c24f98',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,1)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
});

export class App extends Component {
  state = {
    images: [],
    searchValue: '',
    page: 1,
    toShowLargeImage: '',
    showModal: false,
    showLoader: false,
    showLoadMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;

    if (prevState.page !== page || prevState.searchValue !== searchValue) {
      try {
        this.setState({ showLoader: true });

        const fetchResult = await fetchData(searchValue, page);
        if (fetchResult.length === 0) {
          throw new Error('Sorry, no results...');
        }
        this.setState({
          images: [...this.state.images, ...fetchResult],
          showLoadMore: fetchResult.length === 12,
        });
      } catch (error) {
        this.setState({ showLoadMore: false });
        Notify.warning(error.message);
      } finally {
        this.setState({ showLoader: false });
      }
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onLoadMore = () => {
    return this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toShowLargeImage = url => {
    this.toggleModal();
    return this.setState({ toShowLargeImage: url });
  };

  setAppState = value => {
    this.setState({
      page: 1,
      images: [],
      searchValue: value,
      showLoadMore: false,
    });
  };
  render() {
    const { searchValue, page, showLoader, showLoadMore, showModal, images } =
      this.state;

    return (
      <div>
        <Searchbar
          setAppState={this.setAppState}
          searchValue={this.state.searchValue}
        />

        <ImageGallery
          searchValue={searchValue}
          page={page}
          images={images}
          setUrlLargeImage={this.toShowLargeImage}
          setAppState={this.setAppState}
        />
        {showLoadMore && <Button click={this.onLoadMore} />}
        {showModal && (
          <Modal
            largeImageUrl={this.state.toShowLargeImage}
            onCloseModal={this.toggleModal}
          />
        )}
        {showLoader && <Loader />}
      </div>
    );
  }
}
