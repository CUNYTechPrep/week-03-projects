import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (<div>No Results</div>);
}

function ZipSearchField(props) {
  return (
    <div>
      <label>
        Zip Code:
        <input type='text' />
      </label>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className='zip-search-field'>
          <ZipSearchField />
        </div>
        <div className='city'>
          <City />
        </div>
      </div>
    );
  }
}

export default App;
