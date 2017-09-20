import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zip(props) {
  return (
      <div className="panel-heading">
        <h3 className="panel-title">{props.data}</h3>
      </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12 form-inline">
        <label>City Name: </label> 
        <input
          type="text"
          value={props.cityName}
          onChange={props.handleChange}
          placeholder="Try NY" />
      </div>
    </div>
  );
}

class App extends Component {
    constructor() {
    super();
    this.state = {
      cityName: "",
      zips: [],
    }
    this.cityNameChanged = this.cityNameChanged.bind(this);
  }
    cityNameChanged(event) {
    const cityname = event.target.value;
    this.setState({
      cityName: cityname,
    })

    if(cityname.length > 1  ) {
      fetch('http://ctp-zip-api.herokuapp.com/city/'+cityname)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          const zips = jsonResponse.map((zip) => {
            return <Zip data={zip} />;
          });
          this.setState({
            zips: zips,
          });
          
        })
        .catch((e) => {
          this.setState({
            zips: [],
          });
          console.log("In catch: " + e);
        });
    } else {
      this.setState({
        zips: [],
      });
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6 col-xs-offset-3">
              <CitySearchField
                cityName={this.state.cityName}
                handleChange={this.cityNameChanged} />
                {this.state.zips.length > 0 ? this.state.zips : <div>No Results</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
