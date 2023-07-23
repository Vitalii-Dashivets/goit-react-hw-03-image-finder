import React, { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    toShowLargeImage: '',
    showModal: false,
    status: 'idle',
    error: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setSearchValue = value => {
    return this.setState({ searchValue: value });
  };

  onLoadMore = () => {
    this.setStatus('pending');
    return this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toShowLargeImage = url => {
    this.toggleModal();
    return this.setState({ toShowLargeImage: url });
  };

  setStatus = value => {
    this.setState({ status: value });
  };

  render() {
    const { searchValue, page, status, showModal } = this.state;
    let showButton = false;
    let showLoader = false;

    if (status === 'idle') {
      //  showButton = false;
    }
    if (status === 'pending') {
      showLoader = true;
    }
    if (status === 'rejected') {
    }
    if (status === 'resolved') {
      showLoader = false;
      showButton = true;
    }
    return (
      <div>
        <Searchbar
          setSearchValue={this.setSearchValue}
          setStatus={this.setStatus}
        />

        <ImageGallery
          searchValue={searchValue}
          page={page}
          setUrlLargeImage={this.toShowLargeImage}
          setStatus={this.setStatus}
        />
        {showButton && <Button Click={this.onLoadMore} />}
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
