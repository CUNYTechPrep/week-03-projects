import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  return (
    <div className="row col-md-10  col-md-offset-1">
      <div className="panel panel-default">
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
  render() {
    if (this.props.cities.length > 0) {
      let cityList = this.props.cities.map((city, i) => {
        console.log(city);
        return (
          <City key={[city.RecordNumber]} values={city} />
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
  render() {
    console.log("Recreating StateList");
    console.log("Length: " + Object.keys(this.props.states).length);
    if (Object.keys(this.props.states).length > 0) {
//      console.log(Object.values(this.props.states)); 
       let stateList = Object.entries(this.props.states).map((state, i) => {
        console.log(state);
        return (
          <div key={state[0]} className="row col-md-6 col-md-offset-3">
            <div className="panel panel-default text-left">
              <div className="panel-heading">
                {state[0]}
              </div>
              <div className="panel-body">
                <CityList cities={state[1]} />
              </div>
            </div>
          </div>
        );
      });
      return (
        <div>
          {stateList}
        </div>
      );
    } else {
      return <div>hi</div>;
    }
  }
}

class CitySearchField extends Component {
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
    const city =  evt.target.value;
    const cityURL = `http://ctp-zip-api.herokuapp.com/city/${city.toUpperCase()}`;
    const stateZipcodeMap = {}; // contains the mapping from the state to an array of zipcodes

    fetch(cityURL)
      .then(response => response.json())
      .then(zipcodeArray => {
        /* for each zipcode in zipcodeArray: 
          if the zipcode's state is not in stateZipcodeMap, add it 
          then push it into the array
        */
        console.log("Length of zipcodeArray: ", zipcodeArray.length);
        zipcodeArray.forEach(zipcode => {
          const zipURL = `http://ctp-zip-api.herokuapp.com/zip/${zipcode}`;
          fetch(zipURL)
            .then(response => response.json())
            .then(cities => {
              cities.forEach(cityEle => {
                if (cityEle.City.toUpperCase() === city.toUpperCase()) {
                  if (!stateZipcodeMap.hasOwnProperty(cityEle.State)) {
                    stateZipcodeMap[cityEle.State] = [];
                  }
                  stateZipcodeMap[cityEle.State].push(cityEle);
                }
              });
              this.setState({ city, stateZipcodeMap });
            })            
        });
      })
      .catch((error) => {
        console.log("error");
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          <CitySearchField onChange={this.handleChange} />
          <StateList states={this.state.stateZipcodeMap} /> 
      </div>
    );
  }
}

export default App;
