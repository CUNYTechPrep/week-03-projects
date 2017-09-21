import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  return (
    <div className="row col-md-4  col-md-offset-4">
      <div className="panel panel-default text-left">
        <div className="panel-heading">
          {props.values.LocationText}
        </div>
        <div className="panel-body">
          <ul>
            <li>State: {props.values.State}</li>
            <li>Location: ({props.values.Lat}, {props.values.Long})</li>
            <li>Population (estimated): {props.values.EstimatedPopulation}</li>
            <li>Total Wages: {props.values.TotalWages}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

class CityList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.cities.length > 0) {
      let cityList = this.props.cities.map((city, i) => {
        return (
          <City key={i} values={city} />
        );
      });
      return (
        <div>
          {cityList}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

class StateList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Recreating StateList");
    if (Object.keys(this.props.states).length > 0) {
      console.log(Object.values(this.props.states));  
        /*
        return (
          <div clasName="panel panel-default">
            <div className="panel-heading">

            </div>
            <div className="panel-body">
            </div>
          </div>
        );
        */

      return (
        <div>
        </div>
      );
    } else {
      return <div>hi</div>;
    }
  }
}

class CitySearchField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label><strong>City: </strong></label>
        <input type="text" onChange={this.props.onChange} />
      </div>
    );
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      stateZipcodeMap: {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const city =  evt.target.value.toUpperCase();
    const cityURL = `http://ctp-zip-api.herokuapp.com/city/${city}`;
    const stateZipcodeMap = {}; // contains the mapping from the state to an array of zipcodes

    fetch(cityURL)
      .then(response => response.json())
      .then(zipcodeArray => {
        /* for each zipcode in zipcodeArray: 
          if the zipcode's state is not in stateZipcodeMap, add it 
          then push it into the array
        */
        console.log("fetched zipcodes");
        zipcodeArray.forEach(zipcode => {
          const zipURL = `http://ctp-zip-api.herokuapp.com/zip/${zipcode}`;
          fetch(zipURL)
            .then(response => response.json())
            .then(cities => {
              cities.forEach(city => {
                if (!stateZipcodeMap.hasOwnProperty(city.State)) {
                  stateZipcodeMap[city.State] = [];
                }
                stateZipcodeMap[city.State].push(city);
                console.log(stateZipcodeMap[city.State]);
              });
            })
            .then(
              this.setState({
                city: evt.target.value,
                stateZipcodeMap: stateZipcodeMap
              })
            );
        });
      })
      .catch(function(ex) {
        console.log(ex);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <CitySearchField onChange={this.handleChange} />
          <StateList states={this.state.stateZipcodeMap} />
        </p>
      </div>
    );
  }
}

export default App;
