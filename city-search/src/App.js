import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function getZipCodes(cityName){
  return fetch(`http://ctp-zip-api.herokuapp.com/city/${cityName}`)
  .then(res => {
    if (res.status >=  200 && res.status < 300) {
      return res.json();
    }
    else{
      var error = new Error("There is no Zip Code for your input!");
      return Promise.reject(error);
    }
  })
}

function CitySearchField(props){
  return (
    <div className="row center">
      <form >
        <label>City:</label>
        <input type="text" onChange={props.onChange} placeholder="Enter a city name here"/>
      </form>
    </div>
  );
}

function ZipCodeResult(props){
  const errorFound = props.error;

  if (errorFound){
    return (<p>Your input does not yield any zip code</p>);
  }

  else{
    const result = props.result;
    return(
      <div>
        {result.map((zipCode, index) => {
          return (
            <p key={index}>{zipCode}</p>
            );
          })}
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      zipCodeList: [],
      cityName: "",
      error: false,
    };
  }

  handleCityChange = (event) => {
    let city = event.target.value.toUpperCase();
    getZipCodes(city)
    .then(zipList => {
      this.setState({
            zipCodeList: zipList,
            cityName: city,
            error: false,
          });
    })
    .catch(err => {
      this.setState({error: true});
    });
  }

  render() {
    return(
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>

        <CitySearchField className="row" onChange={this.handleCityChange} />
        <p> Zip Codes associated with {this.state.cityName} are: </p>

        <div>
          <ZipCodeResult className="row" result={this.state.zipCodeList} error={this.state.error} />
        </div>
      </div>
    )
  }
}

export default App;
