import React, { Component } from 'react';
import axios from 'axios';
import Gallery from 'react-image-gallery';
// import 'react-image-gallery/styles/css/image-gallery.css';
import nytimes from './nytimes.gif';
import './ImageGallery.css';

class ImageGallery extends Component {
  componentDidMount() {
    this.props.socket.on('change image', (image, index) => {
      this.props.setCurrentImage(image);
      sessionStorage.setItem('currentImage', image);
      if (this.gallery !== null) {
        this.gallery.slideToIndex(index);
      }
    });
  }

  onSlide = event => {
    const index = event;
    var imagesList = this.props.imagesList;
    if (typeof imagesList === 'string') {
      imagesList = JSON.parse(imagesList);
    }
    this.props.socket.emit('change image', imagesList[index], index);

    const formData = new FormData();
    formData.append('userName', this.props.userName);
    formData.append('currentImage', imagesList[index]);

    axios
      .post(`/changePresentationImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .catch(error => {
        console.log(
          'Error in react changePresentationImage post request: ' + error
        );
      });
  };

  render() {
    const images = [];
    var imagesList = this.props.imagesList;
    if (typeof imagesList === 'string') {
      imagesList = JSON.parse(imagesList);
    }
    for (var i = 0; i < imagesList.length; i++) {
      images.push({
        original:
          'https://s3.us-east-2.amazonaws.com/speechflow/' +
          this.props.userName +
          '/' +
          imagesList[i],
        thumbnail:
          'https://s3.us-east-2.amazonaws.com/speechflow/' +
          this.props.userName +
          '/' +
          imagesList[i]
      });
    }

    const startIndex = imagesList.indexOf(this.props.currentImage);

    return (
      <div>
        <Gallery
          className="gallery"
          ref={ref => (this.gallery = ref)}
          items={images}
          startIndex={startIndex}
          onThumbnailClick={this.onThumbnailClick}
          onSlide={this.onSlide}
          slideDuration={0}
          lazyLoad={true}
        />
      </div>
    );
  }
}
export default ImageGallery;
