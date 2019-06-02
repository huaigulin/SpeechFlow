import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import 'react-pdf/dist/Page/AnnotationLayer.css';
// import speechflow from './speechflow_second.pdf';
import MediaQuery from 'react-responsive';
import pdfjsLib from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const DOWN_KEY = 40;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const LEFT_KEY = 37;
const SPACE_KEY = 32;

class PDFViewer extends Component {
  _pageNum = 1;
  _switchingPDF = false;

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      numPages: null
    };

    // this.props.socket.emit('what is doc name and page num?');
    // this.props.socket.emit('login', this.props.userName);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.docName !== this.props.docName ||
      nextProps.pageNum !== this.props.pageNum ||
      nextState.numPages !== this.state.numPages
    ) {
      return true;
    }
    return false;
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
    if (this._switchingPDF) {
      this.props.setPageNum(this._pageNum);
    }
  };

  componentDidMount() {
    this.props.socket.on('SOMEONE HIT NEXT', pageNum => {
      this.props.setPageNum(pageNum);
      sessionStorage.setItem('pageNum', pageNum);
    });

    this.props.socket.on('SOMEONE HIT BACK', pageNum => {
      this.props.setPageNum(pageNum);
      sessionStorage.setItem('pageNum', pageNum);
    });

    this.props.socket.on('SOMEONE GOES TO NEXT PDF', docName => {
      this.props.setDocName(docName);
      sessionStorage.setItem('docName', docName);

      this._switchingPDF = true;
      this._pageNum = 1;

      // this.props.setPageNum(null);
      // sessionStorage.setItem('pageNum', null);
    });

    this.props.socket.on('SOMEONE GOES TO PREVIOUS PDF', (docName, pageNum) => {
      this.props.setDocName(docName);
      sessionStorage.setItem('docName', docName);

      this._switchingPDF = true;
      this._pageNum = pageNum;

      // this.props.setPageNum(pageNum);
      // sessionStorage.setItem('pageNum', pageNum);
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
    this.props.socket.removeListener('SOMEONE GOES TO NEXT PDF');
    this.props.socket.removeListener('SOMEONE GOES TO PREVIOUS PDF');

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
    const pageNum = this.props.pageNum;
    const userName = this.props.userName;
    const docName = this.props.docName;
    if (pageNum > 1) {
      // change slide within same pdf
      this.props.socket.emit('back slide', pageNum - 1);

      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('slideNumber', pageNum - 1);

      axios
        .post(`/changePresentationSlide`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .catch(error => {
          console.log('ERROR in PDFViewer change slides: ' + error);
        });
    } else {
      // switch to another pdf
      const pdfsList = this.props.pdfsList;
      const index = pdfsList.indexOf(docName);
      if (index > 0) {
        // not the first pdf
        const lastPdf = pdfsList[index - 1];
        const pdfPath =
          'https://s3.us-east-2.amazonaws.com/speechflow/' +
          userName +
          '/' +
          lastPdf;
        var self = this;
        pdfjsLib.getDocument(pdfPath).then(function(doc) {
          var numPages = doc.numPages;
          self.props.socket.emit('back pdf', lastPdf, numPages);

          const formData = new FormData();
          formData.append('userName', userName);
          formData.append('docName', lastPdf);
          formData.append('slideNumber', numPages);

          axios
            .post(`/changePresentationDocAndSlide`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .catch(error => {
              console.log('ERROR in PDFViewer change doc and slides: ' + error);
            });
        });
      }
    }
  };

  nextSlide = event => {
    const pageNum = this.props.pageNum;
    const numPages = this.state.numPages;
    const userName = this.props.userName;
    const docName = this.props.docName;
    if (pageNum < numPages) {
      // change slide within same pdf
      this.props.socket.emit('next slide', pageNum + 1);

      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('slideNumber', pageNum + 1);

      axios
        .post(`/changePresentationSlide`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .catch(error => {
          console.log('ERROR in PDFViewer change slides: ' + error);
        });
    } else {
      // switch to another pdf
      const pdfsList = this.props.pdfsList;
      const index = pdfsList.indexOf(docName);
      if (index < pdfsList.length - 1) {
        // not the last pdf
        this.props.socket.emit('next pdf', pdfsList[index + 1]);

        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('docName', pdfsList[index + 1]);
        formData.append('slideNumber', 1);

        axios
          .post(`/changePresentationDocAndSlide`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .catch(error => {
            console.log('ERROR in PDFViewer change doc and slides: ' + error);
          });
      }
    }
  };

  render() {
    const userType = this.props.userType === 'speaker';
    var isDocNameValid = this.props.docName != null;
    const { numPages } = this.state;

    const stylePhoneButton = {
      backgroundColor: 'white',
      border: '2px solid #ffa500',
      borderRadius: '8px',
      color: '#ff4500',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      fontSize: '16px'
    };

    const stylePhoneBackButton = {
      ...stylePhoneButton,
      float: 'left'
    };

    const stylePhoneNextButton = {
      ...stylePhoneButton,
      float: 'right'
    };

    const styleTextCenter = {
      textAlign: 'center'
    };

    const styleDocumentDiv = {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 8,
      zoom: 1
    };

    return (
      <div>
        {isDocNameValid ? (
          <div>
            <MediaQuery query="(min-device-width: 1024px)">
              <div style={styleDocumentDiv}>
                <Document
                  file={
                    'https://s3.us-east-2.amazonaws.com/speechflow/' +
                    this.props.userName +
                    '/' +
                    this.props.docName
                  }
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                  <Page pageNumber={this.props.pageNum} scale={0.8} />
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
                    this.props.docName
                  }
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                  <Page pageNumber={this.props.pageNum} width={300} />
                </Document>
              </div>
              {userType ? (
                <div>
                  <button
                    style={stylePhoneBackButton}
                    onClick={this.previousSlide}
                  >
                    Back
                  </button>
                  <button style={stylePhoneNextButton} onClick={this.nextSlide}>
                    Next
                  </button>
                </div>
              ) : (
                <div />
              )}
            </MediaQuery>
            <p style={styleTextCenter}>
              Page {this.props.pageNum} of {numPages}, Doc{' '}
              {this.props.pdfsList.indexOf(this.props.docName) + 1} of{' '}
              {this.props.pdfsList.length}
            </p>
          </div>
        ) : (
          <div>
            <h5>You don't have PDFs in your flow.</h5>
          </div>
        )}
      </div>
    );
  }
}

export default PDFViewer;
