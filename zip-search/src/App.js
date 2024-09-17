import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div className="row">
      <div className="col-xs-12">
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
              {/* You can add any other data points you want here */}
            </ul>
          </div>
        </div>
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
          id="zip"
          className="form-control"
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
      zipValue: "",
      cities: [],
    }

    // Don't forget to bind the event handler
    this.zipValueChanged = this.zipValueChanged.bind(this);
  }

  zipValueChanged(event) {
    const zip = event.target.value;

    this.setState({
      zipValue: zip,
    })

    if(zip.length === 5) {
      fetch('http://ctp-zip-api.herokuapp.com/zip/'+zip)
        .then((response) => {
          if(response.ok) {
            return response.json();
          } else {
            return [];
          }
          /*
            if we were to just return response.json() here
            then an exception will be thrown if there is an 
            error, and the catch() function below would execute.
            The exception occurs because the API does not return 
            a proper json body when a 404 occurs.
          */
        })
        .then((jsonResponse) => {
          const cities = jsonResponse.map((city) => {
            return <City var data={city} key={city.RecordNumber} />;
          });

          this.setState({
            cities: cities,
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
        cities: [],
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            {/* the following classes centers the 6 columns */}
            <div className="col-sm-6 col-sm-offset-3">
              <ZipSearchField
                zipValue={this.state.zipValue}
                handleChange={this.zipValueChanged} />
              {this.state.cities.length > 0 ? this.state.cities : <div>No Results</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;