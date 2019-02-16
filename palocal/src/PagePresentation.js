import React, { Component } from 'react';
import PDFViewer from './PDFViewer';

class PagePresentation extends Component {
  render() {
    return (
      <PDFViewer
        socket={this.props.socket}
        userName={this.props.userName}
        setDocName={this.props.setDocName}
        setPageNum={this.props.setPageNum}
        docName={this.props.docName}
        pageNum={this.props.pageNum}
        userType={this.props.userType}
      />
    );
  }
}

export default PagePresentation;
