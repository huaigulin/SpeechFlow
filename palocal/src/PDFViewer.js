import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
// import speechflow from './speechflow.pdf';
import MediaQuery from 'react-responsive';
import './PDFViewer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const DOWN_KEY = 40;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const LEFT_KEY = 37;
const SPACE_KEY = 32;

class PDFViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      numPages: null,
      pageNum: this.props.pageNum,
      docName: this.props.docName
    };

    this.props.socket.emit('what is doc name and page num?');
    this.props.socket.emit('login', this.props.userName);
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
    if (this.props.pageNum == null) {
      this.setState({ pageNum: 1 });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.pageNum !== prevProps.pageNum) {
      this.setState({ pageNum: this.props.pageNum });
    }
    if (this.props.docName !== prevProps.docName) {
      this.setState({ docName: this.props.docName });
    }
  }

  componentDidMount() {
    this.props.socket.on('SOMEONE HIT NEXT', pageNum => {
      this.props.setPageNum(pageNum);
      sessionStorage.setItem('pageNum', pageNum);
      this.props.setDocName(this.state.docName);
      sessionStorage.setItem('docName', this.state.docName);
    });

    this.props.socket.on('SOMEONE HIT BACK', pageNum => {
      this.props.setPageNum(pageNum);
      sessionStorage.setItem('pageNum', pageNum);
      this.props.setDocName(this.state.docName);
      sessionStorage.setItem('docName', this.state.docName);
    });

    if (this.props.userType === 'speaker') {
      document.addEventListener('keydown', this._handleKeyDown);
    }

    window.addEventListener(
      'keydown',
      function(e) {
        // space and arrow keys
        if (
          [SPACE_KEY, LEFT_KEY, UP_KEY, RIGHT_KEY, DOWN_KEY].indexOf(
            e.keyCode
          ) > -1
        ) {
          e.preventDefault();
        }
      },
      false
    );
  }

  componentWillUnmount() {
    this.props.socket.removeListener('SOMEONE HIT NEXT');
    this.props.socket.removeListener('SOMEONE HIT BACK');

    document.removeEventListener('keydown', this._handleKeyDown);
  }

  _handleKeyDown = event => {
    switch (event.keyCode) {
      case DOWN_KEY:
        this.nextSlide();
        break;
      case RIGHT_KEY:
        this.nextSlide();
        break;
      case SPACE_KEY:
        this.nextSlide();
        break;
      case UP_KEY:
        this.previousSlide();
        break;
      case LEFT_KEY:
        this.previousSlide();
        break;
      default:
        break;
    }
  };

  previousSlide = event => {
    if (this.state.pageNum > 1) {
      this.props.socket.emit(
        'back slide',
        this.state.docName,
        this.state.pageNum
      );
    }
  };

  nextSlide = event => {
    if (this.state.pageNum < this.state.numPages) {
      this.props.socket.emit(
        'next slide',
        this.state.docName,
        this.state.pageNum
      );
    }
  };

  handleDocNameChange = event => {
    this.setState({ docNameTemp: event.target.value });
  };

  submitDocName = event => {
    this.props.setDocName(this.state.docNameTemp);
  };

  render() {
    const userType = this.props.userType === 'speaker';
    var isDocNameValid = this.state.docName != null;
    const { pageNum, numPages } = this.state;
    return (
      <div>
        {isDocNameValid ? (
          <div>
            <MediaQuery query="(min-device-width: 1024px)">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Document
                  file={
                    'https://s3.us-east-2.amazonaws.com/speechflow/' +
                    this.props.userName +
                    '/' +
                    this.state.docName +
                    '.pdf'
                  }
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNum} scale={0.8} />
                </Document>
              </div>
            </MediaQuery>
            <MediaQuery query="(max-device-width: 1023px)">
              <div>
                <Document
                  file={
                    'https://s3.us-east-2.amazonaws.com/speechflow/' +
                    this.props.userName +
                    '/' +
                    this.state.docName +
                    '.pdf'
                  }
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNum} width={300} />
                </Document>
              </div>
              {userType ? (
                <div>
                  <button
                    className="phoneBackButton"
                    onClick={this.previousSlide}
                  >
                    Back
                  </button>
                  <button className="phoneNextButton" onClick={this.nextSlide}>
                    Next
                  </button>
                </div>
              ) : (
                <div />
              )}
            </MediaQuery>
            <p className="textCenter">
              Page {pageNum} of {numPages}
            </p>
          </div>
        ) : (
          <div>
            <h5>Enter the name of your document: </h5>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleDocNameChange}
            />
            <button onClick={this.submitDocName}>Submit</button>
          </div>
        )}
      </div>
    );
  }
}

export default PDFViewer;
