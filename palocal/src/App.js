import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PageHome from './PageHome';
import PageLogin from './PageLogin';
import PageMobile from './PageMobile';
import PageNonsense from './PageNonsense';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route
              exact
              path="/"
              render={props => <PageHome {...props} data={this.state.data} />}
            />
            <Route
              path="/login"
              render={props => <PageLogin {...props} data={this.state.data} />}
            />
            <Route
              path="/mobile"
              render={props => <PageMobile {...props} data={this.state.data} />}
            />
          </div>
        </BrowserRouter>
        {/* <PageNonsense data={this.state.data} /> */}
      </div>
    );
  }
}

export default App;
