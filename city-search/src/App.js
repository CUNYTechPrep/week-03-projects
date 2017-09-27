import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCode(props) {
  const zip = props.zip;

  return (
    <div className="panel panel-default">
      <div className="panel-heading">{zip}</div>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <label htmlFor="city">
      City: 
      <input name="city"
             type="text"
             placeholder="Enter a City..."
             value={props.value}
             onChange={props.onChange} />
    </label>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', data: []};

    // Bind handleChange and handleSubmit
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.fetchZipCodes = this.fetchZipCodes.bind(this);
  }

  handleChange(event) {
    // NOTE: DEBUG CODE
    // console.log(event.target.value);
    this.setState({value: event.target.value.toUpperCase(), data: []});
    // NOTE: DEBUG CODE
    console.log(this.state);
  }

  handleSubmit(event) {
    // Do Something
    this.fetchZipCodes(this.state.value);

    // Prevent Page Reload
    event.preventDefault();
  }

  fetchZipCodes(city) {
    const API = `http://ctp-zip-api.herokuapp.com/city/${city}`
    // GET JSON
    fetch(API)
      .then( (res) => {
        return res.json();
      })
      .then( (json) => {
        console.log('PARSED JSON: ', json);
        this.setState({
          data: json
        });
      })
      .catch( (ex) => {
        console.log('ERROR: Parsing Failed', ex);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>City Search</h1>
        </header>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <CitySearchField value={this.state.value}
                             onChange={this.handleChange} />
          </form>
        </div>

        <div>
          {console.log(this.state.data)}
          { this.state.data.map( (record, index) => {
            console.log(record);
            return <ZipCode key={index} zip={record} />;
          }, this) }
        </div>
      </div>
    );
  }
}

export default App;
