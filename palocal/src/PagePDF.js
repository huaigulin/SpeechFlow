import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class PagePDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      numPages: null,
      pageNum: this.props.pageNum,
      docName: this.props.docName
    };

    this.props.socket.emit('what is doc name and page num?');
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
    this.props.socket.on('video', () => {
      this.props.history.push('/PageVideo');
    });
    this.props.socket.on('SOMEONE HIT NEXT', pageNum => {
      this.props.setPageNum(pageNum);
      this.props.setDocName(this.state.docName);
    });

    this.props.socket.on('SOMEONE HIT BACK', pageNum => {
      this.props.setPageNum(pageNum);
      this.props.setDocName(this.state.docName);
    });
  }

  componentWillUnmount() {
    this.props.socket.removeListener('SOMEONE HIT NEXT');
    this.props.socket.removeListener('SOMEONE HIT BACK');
  }

  submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    formData.append('userName', this.props.userName);
    axios
      .post(`/upload-file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        // handle your response;
      })
      .catch(error => {
        console.log('ERROR in react PagePDF post request: ' + error);
      });
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
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
    this.props.history.push('/PagePDF');
  };

  render() {
    const isLoggedIn = this.props.userName != null;
    var isDocNameValid = this.state.docName != null;
    const { pageNum, numPages } = this.state;

    return (
      <div>
        <Navbar />
        {isLoggedIn ? (
          <li
            onClick={() => {
              this.props.socket.emit('video');
            }}
          >
            <Link to="/PageVideo/">Speech Flow Video Player</Link>
          </li>
        ) : (
          <h3>You have not logged in. Please log in or sign up.</h3>
        )}
        {isLoggedIn ? (
          <form onSubmit={this.submitFile}>
            <h5>Upload your slides in PDF:</h5>
            <input
              label="upload file"
              type="file"
              onChange={this.handleFileUpload}
            />
            <button type="submit">Upload</button>
          </form>
        ) : (
          <div />
        )}
        {isLoggedIn ? (
          <div>
            {isDocNameValid ? (
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
                  <Page pageNumber={pageNum} />
                </Document>
                <button onClick={this.previousSlide}> Previous </button>
                <button onClick={this.nextSlide}> Next </button>
                <p>
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
        ) : (
          <div />
        )}
      </div>
    );
  }
}
export default PagePDF;
