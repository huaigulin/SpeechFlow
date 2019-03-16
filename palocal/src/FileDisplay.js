import React, { Component } from 'react';
import AWS from 'aws-sdk';
import bluebird from 'bluebird';
import EnhancedTable from './EnhancedTable';

class FileDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // files: null,
      table: null
    };
    this.getAmazon = this.getAmazon.bind(this);
    this.getAmazon(this.props.userName);
  }

  getAmazon(userName) {
    var params = null;
    var isLoggedIn = this.props.userName != null;
    if (isLoggedIn) {
      AWS.config.setPromisesDependency(bluebird);
      AWS.config.update({
        accessKeyId: 'AKIAJ2AJSWCEWUVGAXUQ', //process.env.AWS_KEY,
        secretAccessKey: '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' //process.env.AWS_SECRET
      });
      var s3 = new AWS.S3();
      params = {
        Bucket: 'speechflow',
        Prefix: this.props.userName
      };
      s3.listObjectsV2(
        params,
        function(err, data) {
          if (err) console.log(err, err.stack);
          // an error occurred
          else {
            // var amazon = [];
            var table = [];
            var charsToOmit = userName.length + 1;
            for (var i = 0; i < data.Contents.length; i++) {
              var key = data.Contents[i].Key;
              var fileName = key.substring(charsToOmit);
              var date = data.Contents[i].LastModified.toDateString();
              date = date.substring(4);
              date = date.split(' ');
              var month = '00';
              switch (date[0]) {
                case 'Jan':
                  month = '01';
                  break;
                case 'Feb':
                  month = '02';
                  break;
                case 'Mar':
                  month = '03';
                  break;
                case 'Apr':
                  month = '04';
                  break;
                case 'May':
                  month = '05';
                  break;
                case 'Jun':
                  month = '06';
                  break;
                case 'Jul':
                  month = '07';
                  break;
                case 'Aug':
                  month = '08';
                  break;
                case 'Sep':
                  month = '09';
                  break;
                case 'Oct':
                  month = '10';
                  break;
                case 'Nov':
                  month = '11';
                  break;
                default:
                  month = '12';
                  break;
              }
              date = month + '/' + date[1] + '/' + date[2];
              var fileExtension = key.split('.')[1];
              var type = 'PDF';
              if (fileExtension !== 'pdf') {
                type = 'Image';
              }
              var size = data.Contents[i].Size;
              var sizeString = this.bytesToSize(size);
              var tableRow = {
                id: i,
                fileName: fileName,
                dateUploaded: date,
                type: type,
                size: sizeString,
                label: 'kimchi'
              };
              table.push(tableRow);
              // amazon.push(key);
            }
            this.setState({ table: table });
            // this.setState({ files: amazon });
          } // successful response
        }.bind(this)
      );
    }
  }

  bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  render() {
    const tableIsNotNull = this.state.table != null;
    return (
      <div>
        {tableIsNotNull ? (
          <EnhancedTable
            table={this.state.table}
            userName={this.props.userName}
            setSelectedFiles={this.props.setSelectedFiles}
          />
        ) : (
          <div />
        )}
        {/* {this.state.files.map((file, index) => (
          <p key={index}>
            {' '}
            file {index + 1}: {file}{' '}
          </p>
        ))} */}
      </div>
    );
  }
}

export default FileDisplay;
