import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
      </div>
      <div className="panel-body">
      </div>
    </div>
  );
}

class ZipSearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });

    console.log(event.target.value);
    const url = `http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const zipCodeArr = [];
        console.log(response);
      })
      .catch(function(ex) {
        console.log('parsing failed ', ex);
      });
  }

  render() {
    return (
      <div>
        <h1>Zip Code: </h1>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </div>
    );    
  }

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
