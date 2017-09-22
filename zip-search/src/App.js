import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

function City(props) {
  return (
    <div className="container">
      <div className="panel-group col-md-6 col-sm-12 col-md-offset-3">
        <div className="panel panel-primary">
          <div className="panel-heading">{props.data.City}</div>
          <div className="panel-body">
            <ul>
              <li>State: {props.data.State}</li>
              <li>Location: {props.data.Location}</li>
              <li>Population (estimated): {props.data.EstimatedPopulation}</li>
              <li>Total Wages: {props.data.TotalWages}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="container" id="zip-align-center">
      <div className="row">
        <div className="col-md-12 text-center">
          <strong>Zip Code:&nbsp;</strong>
          <input
            type="text"
            placeholder="Try 10016"
            onChange={props.handleChanged}
            value={props.value}
          />
        </div>
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: "",
      cities: []
    };
    this.zipCodeChanged = this.zipCodeChanged.bind(this);
  }

  zipCodeChanged(event) {
    const zip = event.target.value;

    if (zip.length === 5) {
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip)
        .then(response => {
          return response.json();
        })
        .then(jsonBody => {
          console.log(jsonBody);

          const cityComponents = jsonBody.map(city => {
            return <City data={city} />;
          });

          this.setState({
            cities: cityComponents
          });
        });
    }

    this.setState({
      zipCode: zip
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChanged={this.zipCodeChanged} value={this.state.zipCode}/>
        <div>{this.state.cities}</div>
      </div>
    );
  }
}

export default App;