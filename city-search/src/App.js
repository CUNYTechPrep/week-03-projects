import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCode(props) {
  return(
    <div className="container">
      <div className="row">
        <div className="panel panel-default">
          <div className="panel-body">
            {props.data}
          </div>

        </div>
      </div>
    </div>
  );
}

function States(props) {
  return(
    <div className="container">
      <div className="row">
        <div className="panel panel-default">
          <div className="panel-body">
            {props.data}
          </div>
        </div>
      </div>
    </div>
  );
}

function CitySearchField(props) {
  return(
    <div>
      <label><b>City Name:</b></label>
      <input type="text" id="citySearchBox" placeholder="ex.SPRINGFIELD" onChange={props.handleChange}/>
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      cityName: "",
      zipCodes: [],
      states: [],
      statesWithZipcode: []
    }
    this.cityNameChanges = this.cityNameChanges.bind(this);
  }

  cityNameChanges(event) {
    const city = event.target.value.toUpperCase();                      //set city name
    var stateAndZipcodes = [];

    if(city.length > 2){
      fetch('https://ctp-zip-api.herokuapp.com/city/' + city)
      .then((response) => {
        return response.json();
      })
      .then((jsonBody) => {
        const zipCodeComps = jsonBody.map((z) => <ZipCode data={z} />);  //array of zip codes 
        this.setState({
         zipCodes: zipCodeComps
        });
        /*zipCodeComps.forEach((zipcode) => {                             
          fetch('https://ctp-zip-api.herokuapp.com/zip/' + zipcode)
          .then((response) => {
            return response.json();
          })
          .then((jsonBody) => {
            //all the cities
            const zipCodeCityInfo = jsonBody;

            zipCodeCityInfo.forEach((city) => {
              if(city["City"] == this.state.cityName){                   //check if city name matches
                if(stateAndZipcodes[city["State"]] != undefined){        //check if the array have the state as a key
                  stateAndZipcodes[city["State"]].push(city["Zipcode"]);     //add the zip code if it does
                } else {
                  stateAndZipcodes[city["State"]] = [];                 //create a new set and then add zip code if it doesn't contain the key
                  stateAndZipcodes[city["State"]].push(city["Zipcode"]);
                }
              }
            });
          })
        });*/
      })
      .catch((err) => {
        this.setState({
          zipCodes: [
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-default">
                    <div className="panel-body"><b>No result</b></div>
                  </div>
                </div>
              </div>
            </div>
          ]
        });
      })
    }
    this.setState ({
      cityName: city
    })
    /*console.log(stateAndZipcodes);
      this.setState({
        statesWithZipcode: stateAndZipcodes.map((s) => <States data={s}/>)
      })*/
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>City Search</h1>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <CitySearchField handleChange={this.cityNameChanges} value={this.state.cityName} />
            </div>
          </div>
        </div>

        <div>
          {this.state.zipCodes}
        </div>
      </div>
    );
  }
}

export default App;
