import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
function City(props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{props.data.LocationText}</h3>
      </div>
      <div className="panel-body">
        <ul>
          <li>State: {props.data.State}</li>
          <li>Location: ({props.data.Lat}, {props.data.Long})</li>
          <li>Population (estimated): {props.data.EstimatedPopulation}</li>
          <li>Total Wages: {props.data.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}
function ZipSearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12 form-inline">
        <label htmlFor="zip">Zip Code: </label>
        <input
          type="text"
          value={props.zipValue}
          onChange={props.handleChange}
          placeholder="Try 10016" />
      </div>
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      zip_input: "",
      cities_output:[],
    }
    this.Zip_changed = this.Zip_changed.bind(this);
  }
  Zip_changed(event) {
    const input = event.target.value;
    this.setState({
      zip_input: input,
    })

    if (input.length === 5) {
      fetch('http://ctp-zip-api.herokuapp.com/zip/'+input)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          const results = jsonResponse.map((city) => {
            return <City data={city} />;
          });
          this.setState({
            cities_output: results,
          });
        })
        .catch((e) => {
          this.setState({
            cities: [],
          });
          console.log("In catch: " + e);
        });
      } else {
        this.setState({
          cities_output:[],
        })
      }
    }
    render() {
      return (
        <div className="App">
          <div className="App-header">
            <h2>Zip Code Search</h2>
          </div>
          <div className = "row">
          <div className = "col-xs-offset-5">
          <ZipSearchField
            zipValue={this.state.zip_input}
            handleChange={this.Zip_changed} />
            {this.state.cities_output.length > 0 ? this.state.cities_output : <div>No Results</div>}
            </div>
          </div>
          </div>
      )
    }
}

export default App;
