import React, { Component } from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

class ImageGallery extends Component {
  render() {
    const images = []
    for (var i=0; i<this.props.imagesList.length; i++){
      images.push(
        {
          original:
            'https://s3.us-east-2.amazonaws.com/speechflow/' +
            this.props.userName +
            '/' +
            this.props.imagesList[i],
          thumbnail:
            'https://s3.us-east-2.amazonaws.com/speechflow/' +
            this.props.userName +
            '/' +
            this.props.imagesList[i]
        }
      )
    }

    return (
      <div>
        <Gallery items={images} />
      </div>
    );
  }
}
export default ImageGallery;
