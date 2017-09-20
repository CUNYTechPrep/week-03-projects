import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  return (
    <div className="row">
      <div className="panel panel-default">
        <div className="panel-heading">{props.city.LocationText}</div>
        <div className="panel-body">
          <ul>
            <li>State: {props.city.State}</li>
            <li>Location: ({props.city.Lat}, {props.city.Long})</li>
            <li>Population (estimated): {props.city.EstimatedPopulation}</li>
            <li>Total Wages: {props.city.TotalWages}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="row">
      <form method="GET" className="form-inline">
        <div className="form-group">
          <label htmlFor="zipcode">Zip Code:</label>
          <input type="text" className="form-control" id="zipcode" name="zipcode" value={props.zipcode} onChange={props.onChange}/>
        </div>
      </form>
    </div>
  );
}

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        zipcode : "",
        cities : []
      };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let zipcodeInput = event.target.value;
    this.setState({zipcode: zipcodeInput});
    if(zipcodeInput.length === 5) { // only fetch if proper length
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + zipcodeInput)
        .then(response => {
          return response.json();
        }).then(json => {
          this.setState({cities: json});
        }).catch(error => {
          this.setState({cities: []});
        });
    }
  }

  render() {
    let cityOutput; // used to hold the output of the cities
    if(this.state.zipcode.length !== 5)   // if input zipcode is not 5 digits, have an empty result
      cityOutput = "";
    else if(this.state.cities.length === 0)  // if cities are empty, there are "no results"
      cityOutput = <div className="no-results row">No Results</div>;
    else {  // else if there are results, map them to City components to be rendered later
      cityOutput = this.state.cities.map(city => {
        return <City city={city} />;
      });
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container">
          <ZipSearchField zipcode={this.state.zipcode} onChange={this.handleChange} />
          <div className="cities">
            {cityOutput}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
