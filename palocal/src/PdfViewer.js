import React from 'react';
import PDF from 'react-pdf-js';
import demo from './demo.pdf';

class PdfViewer extends React.Component {
  state = {};

  componentDidMount(){
    this.props.socket.on('SOMEONE HIT NEXT', (pageNum) => {
    console.log('Moving to the next slide')
    this.setState({ page: pageNum });
    });

    this.props.socket.on('SOMEONE HIT BACK', (pageNum) => {
    console.log('Moving back a slide')
    this.setState({ page: pageNum });
    });
  }

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  handlePrevious = (socket) => {
    console.log('sending previous')
    socket.emit('back slide', this.state.page - 1);
  }

  handleNext = (socket) => {
    console.log('sending next')
    socket.emit('next slide', this.state.page + 1);
  }

  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={() => {this.handlePrevious(this.props.socket)}}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={() => {this.handleNext(this.props.socket)}}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
      );
  }

  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div>
        <PDF
          file={demo}
          onDocumentComplete={this.onDocumentComplete}
          page={this.state.page}
        />
        {pagination}
      </div>
    )
  }
}

export default PdfViewer;
