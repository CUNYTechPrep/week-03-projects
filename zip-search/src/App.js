import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (<div></div>);
}

function ZipSearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12 form-inline">
        <label htmlFor="zip">Zip Code: </label>
        <input
          type="text"
          id="zip"
          className="form-control"
          value={props.zipValue}
          onChange={props.handleChange}
          placeholder="Try 11418" />
      </div>        
    </div>
  );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      zipValue: "",
      cities: [],
    }

    this.zipValueChanged = this.zipValueChanged.bind(this);
  }

  zipValueChanged(event) {
    const zip = event.target.value;

    this.setState({zipValue: zip});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <ZipSearchField 
              zipValue={this.state.zipValue}
              handleChange={this.zipValueChanged} />
        
          </div>
        </div>
      </div>
    );
  }
}

export default App;
