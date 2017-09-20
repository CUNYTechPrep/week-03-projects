import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function CitySearchField(props) {
  return (
    <div className="row">
      <form method="GET" className="form-inline">
        <div className="form-group">
          <label htmlFor="city">City: </label>
          <input type="text" className="form-control" id="city" name="city" value={props.city} onChange={props.onChange}/>
        </div>
      </form>
    </div>
  );
}

class Zipcodes extends Component {
  render() {
    // map each zipcode to a list item to be rendered
    let zipcodeOutput = this.props.zipcodes.map((zipcode, index) => {
      console.log(index);
      return <li key={index}>{zipcode}</li>;
    });
    return (
      <div className="row">
        <div className="panel panel-default">
          <div className="panel-heading">{this.props.state}</div>
          <div className="panel-body">
            <ul>
              {zipcodeOutput}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      stateZipMap: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.convertJsonToMap = this.convertJsonToMap.bind(this);
  }

  convertJsonToMap(zipcodes, city) {
    let statesMap = {};
    // for each zipcode
    zipcodes.forEach((zipcode, index) => {
      // fetch the cities associated with the zipcode
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + zipcode)
        .then(response => {
          return response.json();
        }).then(json => {
          // loop through the cities and find the one that corresponded to the input
          for(let i = 0; i < json.length; i++) {
            if(json[i].City === city) {
              let state = json[i].State;
              // if the key wasn't defined before, define an empty array as the value
              if(statesMap[state] === undefined)
                statesMap[state] = [];
              statesMap[state].push(zipcode); // push the zipcode to its state
              break;  // breaking out of the loop once we found the input city
            }
          }
          // if we're done going through the zipcodes, then set the map state to update the app
          if(index === zipcodes.length-1)   // index reached the end
            this.setState({stateZipMap: statesMap});
        }).catch(error => {
          console.log(error);
        });
    });
  }

  handleChange(event) {
    let inputCity = event.target.value;
    this.setState({city: inputCity});
    // retrieving all of the zipcodes associated with the input city
    fetch("http://ctp-zip-api.herokuapp.com/city/" + encodeURIComponent(inputCity.toUpperCase()))
      .then(response => {
        return response.json();
      }).then(json => {
        // calling this method converts the zipcodes to a map of <states, zipcodes>
        this.convertJsonToMap(json, inputCity.toUpperCase());
      }).catch(error => {
        this.setState({ stateZipMap: {} });
      });
  }

  render() {
    // map each key to a Zipcodes component
    let statesZipcodeOutput = Object.keys(this.state.stateZipMap).map(key => {
      return <Zipcodes state={key} zipcodes={this.state.stateZipMap[key]} />;
    });

    return (
      <div className="Container">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className="container">
          <CitySearchField city={this.state.city} onChange={this.handleChange} />
          <div className="zipcodes">
            {statesZipcodeOutput}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
