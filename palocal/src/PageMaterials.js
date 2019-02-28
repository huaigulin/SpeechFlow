import React, { Component } from 'react';
import UploadPDFAndImage from './UploadPDFAndImage';
import Navbar from './Navbar';
import UploadVideoLink from './UploadVideoLink';
import AWS from 'aws-sdk';
import bluebird from 'bluebird';

class PageMaterials extends Component {
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
    this.getAmazon = this.getAmazon.bind(this);
    this.getAmazon(this.props.userName);
  }

  getAmazon (userName) {
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
        Bucket: "speechflow",
        Prefix: this.props.userName,
        MaxKeys: 10
      };
      s3.listObjectsV2(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else{
          console.log(data.Contents);
          var amazon = [];
          var charsToOmit = userName.length + 1;
          for (var i=0; i<data.Contents.length; i++){
            var key = data.Contents[i].Key;
            key = key.substring(charsToOmit)
            amazon.push(key);
          }
          console.log(amazon);
          this.setState({files: amazon});
        }                // successful response
     }.bind(this));
    }
  }

  render() {
    const isLoggedIn = this.props.userName != null;
    return (
      <div>
        <Navbar />
        {isLoggedIn ? (
          <div>
          <h1> Your Files: </h1>
          {this.state.files.map((file, index) => (
            <p> file {index + 1}: {file} </p>
          ))}
          </div>
        ) : (
          <h3>You have not logged in. Please log in or sign up.</h3>
        )}
        {isLoggedIn ? (
          <UploadPDFAndImage userName={this.props.userName} />
        ) : (
          <div />
        )}
        {isLoggedIn ? (
          <UploadVideoLink userName={this.props.userName} />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default PageMaterials;
