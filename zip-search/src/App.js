import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (<div></div>);
}

function ZipSearchField(props) {
  return (<div></div>);
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField />
        <div>
          <City />
          <City />
        </div>
      </div>
    );
  }
}

export default App;
