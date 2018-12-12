import React from 'react';
import PDF from 'react-pdf-js';
import demo from './demo.pdf';

class PdfViewer extends React.Component {
  state = {};

  componentDidMount() {
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

  onDocumentComplete = pages => {
    this.setState({ page: 1, pages });
  };

  handlePrevious = socket => {
    console.log('sending previous');
    socket.emit('back slide', this.state.page);
  };

  handleNext = socket => {
    console.log('sending next');
    console.log(this.state.page);
    socket.emit('next slide', this.state.page);
  };

  renderPagination = (page, pages) => {
    let previousButton = (
      <li
        className="previous"
        onClick={() => {
          this.handlePrevious(this.props.socket);
        }}
      >
        Previous
      </li>
    );
    if (page === 1) {
      previousButton = (
        <li className="previous disabled">
          <a href="#">
            <i className="fa fa-arrow-left" /> Previous
          </a>
        </li>
      );
    }
    let nextButton = (
      <li
        className="next"
        onClick={() => {
          this.handleNext(this.props.socket);
        }}
      >
        <a href="#">
          Next <i className="fa fa-arrow-right" />
        </a>
      </li>
    );
    if (page === pages) {
      nextButton = (
        <li className="next disabled">
          <a href="#">
            Next <i className="fa fa-arrow-right" />
          </a>
        </li>
      );
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  };

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
    );
  }
}

export default PdfViewer;
