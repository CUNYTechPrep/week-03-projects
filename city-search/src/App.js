import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {CitySeachField} from './SearchField.js'

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div>
              <CitySeachField />
          </div>

      </div>
    );
  }
}

export default App;
