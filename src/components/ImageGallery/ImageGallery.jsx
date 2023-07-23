import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchData } from 'services/fetch-api';

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
    const { searchValue, page, setStatus } = this.props;
    if (searchValue === '') {
      return;
    }

    if (prevProps.searchValue !== searchValue) {
      try {
        setTimeout(
          () =>
            fetchData(searchValue, page).then(response => {
              if (response.status === 200) {
                setStatus('resolved');
                return this.setState({ images: response.data.hits });
              }
            }),
          3000
        );
      } catch (error) {
        console.log('error', error);
      } finally {
      }
    } else if (
      prevProps.searchValue === searchValue &&
      prevProps.page !== page
    ) {
      try {
        setTimeout(
          () =>
            fetchData(searchValue, page).then(response => {
              if (response.status === 200) {
                setStatus('resolved');
                return this.setState(prevState => ({
                  images: [...prevState.images, ...response.data.hits],
                }));
              }
            }),
          3000
        );
      } catch (error) {
      } finally {
      }
    }
  }
  showLargeImage = evt => {
    return this.props.setUrlLargeImage(evt.target.getAttribute('alt'));
  };
  render() {
    return (
      <ul className={css.ImageGallery} onClick={this.showLargeImage}>
        {this.state.images.map(item => {
          return (
            <ImageGalleryItem
              key={item.id}
              smallImageUrl={item.webformatURL}
              largeImageUrl={item.largeImageURL}
            />
          );
        })}
      </ul>
    );
  }
}
