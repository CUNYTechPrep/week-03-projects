import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  const cities = [{}];
  const url = 'http://ctp-zip-api.herokuapp.com/zip/';
  /*fetch(`${url + props.value}`) 
    .then {

    }
 */
  return (<div>{props.value}</div>);
}

function ZipSearchField(props) {
  return (
    <div className='zip-search-field'>
      <label>
        Zip Code:
        <input 
          type='text' 
          placeholder='Try 10016'
          value={props.value} 
          onChange={props.handleChange}
        />
      </label>
    </div>
  );
}

class App extends Component {
  constructor(props) {
  	super(props);
  	this.state = {value: 'No Results'};

  	this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={this.handleChange}/>
        <div className='city'>
          <City value={this.state.value}/>
        </div>
      </div>
    );
  }
}

export default App;