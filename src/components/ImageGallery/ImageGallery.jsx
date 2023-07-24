import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
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

export class ImageGallery extends Component {
  state = {
    images: [],
  };

  componentDidMount() {
    if (this.props.searchValue === '') {
      return;
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchValue, page, setAppState } = this.props;

    if (
      prevProps.searchValue !== searchValue ||
      (prevProps.searchValue === searchValue && prevProps.page !== page)
    ) {
      try {
        setAppState({ status: 'pending' });
        const fetchResult = await fetchData(searchValue, page);

        if (
          fetchResult.length !== 0 &&
          prevProps.searchValue === searchValue &&
          prevProps.page !== page
        ) {
          this.setState({
            images: [...prevState.images, ...fetchResult],
          });
        } else if (
          fetchResult.length !== 0 &&
          prevProps.searchValue !== searchValue
        ) {
          this.setState({
            images: fetchResult,
          });
        } else if (fetchResult.length === 0) {
          this.setState({
            images: fetchResult,
          });
          throw new Error('Sorry, no results...');
        }
        setAppState({ status: 'resolved' });
      } catch (error) {
        setAppState({ status: 'rejected' });
        Notify.warning(error.message);
      }
    } else {
      return;
    }
  }

  showLargeImage = largeImageUrl => {
    this.props.setUrlLargeImage(largeImageUrl);
  };

  render() {
    return (
      <ul className={css.ImageGallery}>
        {this.state.images.map(item => {
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
