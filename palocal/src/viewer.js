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
      this.setState({ pageNumber: pageNum });
    });

    this.props.socket.on('SOMEONE HIT BACK', pageNum => {
      this.setState({ pageNumber: pageNum });
    });
  }

  componentWillUnmount() {
    this.props.socket.removeListener('SOMEONE HIT NEXT');
    this.props.socket.removeListener('SOMEONE HIT BACK');
  }

  handlePrevious = (socket) => {
    console.log('sending previous')
    socket.emit('back slide', this.state.page - 1);
  }

  handleNext = (socket) => {
    console.log('sending next')
    socket.emit('next slide', this.state.page + 1);
  }

  render() {
    const { pageNumber, numPages } = this.state;
    let previousButton = <li className="previous" onClick={() => {this.handlePrevious(this.props.socket)}}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (pageNumber === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={() => {this.handleNext(this.props.socket)}}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (pageNumber === numPages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <div>
        <Document
          file={demo}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </div>
    );
  }
}
