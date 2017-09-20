import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function CityDetails(props) {
  return(
    <div className = "panel-body text-left">
          <ul className = "list-unstyled">
            <li> <strong>City: </strong> {props.data.City} </li>
            <li> <strong>State:</strong> {props.data.State} </li>
            <li> <strong>Country:</strong> {props.data.Country} </li>
            <li> <strong>World Region:</strong> {props.data.WorldRegion} </li>
            <li> <strong>Latitude:</strong> {props.data.Lat} </li>
            <li> <strong>Longitude:</strong> {props.data.Long} </li>
            <li> <strong>Estimated Population:</strong> {props.data.EstimatedPopulation} </li>
            <li> <strong>Total Wages:</strong> {props.data.TotalWages} </li>
            <li> <strong>Decommisioned:</strong> {(props.data.Decommisioned === true) ? "Yes" : "No"} </li>
          </ul>
    </div>
  );
}

function ZipCode(props){
  return(
    <div className = "col-md-4">
      <div className = "panel panel-info">
        <div className = "panel-heading">
          <strong> Zip Code: </strong> {props.data.Zipcode}
        </div>
        <CityDetails data={props.data}/>
      </div>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className = "center-block ">
      <label>City: </label>
      <input type="text" onChange={props.handleChange} value={props.value} />
    </div>
    );
}


class App extends Component {
  constructor() {
    super();

    this.state = {
      city: "",
      zipCodes: []
    };

     this.cityChanged = this.cityChanged.bind(this);
  }

  cityChanged(event){
    const city = event.target.value;

    this.setState({
            zipCodes: []
          })

    if(city.length >= 4) {
      fetch('http://ctp-zip-api.herokuapp.com/city/' + city.toUpperCase())
        .then((response) => {
          return response.json();
        })
        .then((jsonBody) => {

          const zipCodes = jsonBody;
          zipCodes.forEach(
            (zipCode) => {
              fetch('http://ctp-zip-api.herokuapp.com/zip/' + zipCode)
                .then((response) => {
                  return response.json();
                })
                .then((jsonBody) => {

                const zipComps = jsonBody.map((zip) => <ZipCode data={zip}/>);
                this.setState({
                  zipCodes: this.state.zipCodes.concat(zipComps)
                });
              })
            }
          );
        })
    }

    this.setState({
      city: city
    });

  }



  render() {
    return (
      <div className="App">
        <div className = "App-header jumbotron">
          <div className="text-center container">
            <h1>City Search</h1>
          </div>
        </div>
        <CitySearchField handleChange = {this.cityChanged} value = {this.state.city}/>
        <div className = "container-fluid">
          <div className = "row">
            {this.state.zipCodes}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
