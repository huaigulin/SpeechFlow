import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import demo from './demo.pdf';

class viewer extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  componentDidMount(){
    this.props.socket.on('SOMEONE HIT NEXT', pageNum => {
      this.setState({ page: pageNum });
    });

    this.props.socket.on('SOMEONE HIT BACK', pageNum => {
      this.setState({ page: pageNum });
    });
  }

  componentWillUnmount() {
    this.props.socket.removeListener('SOMEONE HIT NEXT');
    this.props.socket.removeListener('SOMEONE HIT BACK');
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          file={demo}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}
