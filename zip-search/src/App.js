import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {

  const record = props.record;
  // console.log(City, State, Location, Long, Lat, EstimatedPopulation, TotalWages);

  return (
    <div className="panel panel-default">
      <div className="panel-heading">{record.LocationText}</div>
      <div className="panel-body">
        <ul>
          <li>State: {record.State}</li>
          <li>Location: ({record.Long}, {record.Lat})</li>
          <li>Population (Estimated): {record.EstimatedPopulation}</li>
          <li>Total Wages: {record.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <label htmlFor="zip">
    Zip Code: 
    <input name="zip"
           type="text"
           placeholder="Enter a Zip Code..."
           value={props.value}
           onChange={props.onChange} />
    </label>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', data: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchCities = this.fetchCities.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
    console.log(this.state);
  }

  handleSubmit(event) {
    this.fetchCities(this.state.value);
    
    event.preventDefault();
  }

  fetchCities(zip) {
    const API = `http://ctp-zip-api.herokuapp.com/zip/${zip}`
    // GET JSON
    fetch(API)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log('parsed JSON', json);
        this.setState({
          data: json
        });
      })
      .catch((ex) => {
        console.log('parsing failed', ex);
      })
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container">
          <form
            onSubmit={this.handleSubmit} >
            <ZipSearchField
              value={this.state.value}
              onChange={this.handleChange} />
          </form>

          <div>
            {console.log("TEST")}
            {console.log(this.state.data)}
            { this.state.data.map((record, index) => {
              return <City key={index} record={record} />;
            }, this) }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
