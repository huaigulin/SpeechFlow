import React, { Component } from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

class ImageGallery extends Component {
  constructor(props) {
    super(props);
  }

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

    return (
      <div>
        <Gallery items={images} />
      </div>
    );
  }
}
export default ImageGallery;
