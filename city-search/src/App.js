import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zip(props) {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{props.data.LocationText}</h3>
          </div>
          <div className="panel-body">
            <ul>
              <li>Zip: {props.data}</li>
              {/* You can add any other data points you want here */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12 form-inline">
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          className="form-control"
          value={props.city}
          onChange={props.handleChange}
          placeholder="Try New York" />
      </div>
    </div>
  );
}

class App extends Component {

	constructor() {
    super();
    this.state = {
      zipValues: [],
      city: "",
    }

    this.cityValueChanged = this.cityValueChanged.bind(this);
  }

  cityValueChanged(event) {
    const name = event.target.value;

    this.setState({
      city: name,
    })

    if(name.length > 0) {
      fetch('http://ctp-zip-api.herokuapp.com/city/'+name.toUpperCase())
        .then((response) => {
          if(response.ok) {
            return response.json();
          } else {
            return [];
          }
        })
        .then((jsonResponse) => {
          const zipValues = jsonResponse.map((zip) => {
            return <Zip data={zip} />;
          });

          this.setState({
            zipValues: zipValues,
          });
        })
        .catch((e) => {
          this.setState({
            zipValues: [],
          });
          console.log("In catch: " + e);
        });
    } else {
      this.setState({
        zipValues: [],
      });
    }
  }

	render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            {/* the following classes centers the 6 columns */}
            <div className="col-sm-6 col-sm-offset-3">
              <CitySearchField
                city={this.state.city}
                handleChange={this.cityValueChanged} />
              {this.state.zipValues.length > 0 ? this.state.zipValues : <div>No Results</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
