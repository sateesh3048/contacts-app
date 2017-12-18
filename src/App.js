import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './containers/Layout/Layout'; 

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <Layout />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
