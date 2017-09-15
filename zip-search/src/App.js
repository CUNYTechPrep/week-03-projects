import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading">
              {props.data.City}
            </div>
            <div className="panel-body">
              <ul className="list-unstyled">
                <li>State: {props.data.State}</li>
                <li>Estimated Population: {props.data.EstimatedPopulation}</li>
                <li>Total Wages: {props.data.TotalWages}</li>
                <li>Latitude: {props.data.Lat}</li>
                <li>Longitude: {props.data.Long}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <form>
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="input-group">
            <input type="text" className="form-control" value={props.value} placeholder="zip code" onChange={props.handleChange} />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">Search</button>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: "",
      cities: [],
    }
    this.zipCodeSearch = this.zipCodeSearch.bind(this);
  }

  zipCodeSearch(event) {
    const zip = event.target.value;
    this.setState({
      zipCode: zip
    });
    if(zip.length === 5) {
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip)
        .then(response => {
          return response.json();   // convert to json and return
        })
        .then(jsonBody => {
          const cities = jsonBody.map(city => <City data={city} key={city.RecordNumber} /> );
          this.setState({
            cities
          });
        })
        .catch(error => {
          this.setState({
            cities: [<h2 key={error}>no result</h2>]
          });
        });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={this.zipCodeSearch} value={this.state.zipCode} />
        <div className="text-center">
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
