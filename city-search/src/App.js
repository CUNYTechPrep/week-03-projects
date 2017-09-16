import React, { Component } from "react";
import "./App.css";

function ZipCode(props) {
  return (
    <div className="panel-group" id="accordion">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h4 className="panel-title">
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={props.onZipClicked}
              value={props.zipCode}
            >
              {props.zipCode}
            </button>
          </h4>
        </div>
      </div>
    </div>
  );
}

function City(props) {
  return (
    <div id="collapse1" className="panel-collapse collapse in">
      <div className="panel-body">
        <ul>
          <li>State: {props.data.State}</li>
          <li>State: {props.data.State}</li>
          <li>Location: {props.data.Location}</li>
          <li>Population (estimated): {props.data.EstimatedPopulation}</li>
          <li>Total Wages: {props.data.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="container" id="zip-align-center">
      <div className="row">
        <div className="col-md-12 text-center">
          <strong>City:&nbsp;</strong>
          <input
            type="text"
            placeholder="Try SPRINGFIELD"
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
      city: "",
      zipCodes: [],
      zipCode: "",
      cities: []
    };
    this.cityChanged = this.cityChanged.bind(this);
    this.onZipClicked = this.onZipClicked.bind(this);
  }

  cityChanged(event) {
    const city = event.target.value;

    if (typeof city === "string" && city.length >= 4) {
      fetch("http://ctp-zip-api.herokuapp.com/city/" + city.toUpperCase())
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json);

          const zipCodes = json.map(zipCode => {
            return (
              <div className="container">
                <div className="col-md-6 col-md-offset-3">
                  <div className="list-group">
                    <ZipCode zipCode={zipCode} onClick={this.onZipClicked} />
                  </div>
                </div>
              </div>
            );
          });

          this.setState({ zipCodes });
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    }

    this.setState({ city });
  }

  onZipClicked(event) {
    const zipCode = event.target.value;

    if (typeof zipCode === "number" && zipCode === 5) {
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + zipCode)
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json);

          const cities = json.map(city => {
            return <City data={city} />;
          });

          this.setState({ cities });
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    }

    this.setState({ zipCode });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField
          handleChanged={this.cityChanged}
          value={this.state.city}
        />
        <div>{this.state.zipCodes}</div>
      </div>
    );
  }
}

export default App;
