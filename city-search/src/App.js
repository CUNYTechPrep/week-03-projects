import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function CitySearchField(props) {
  return(
    <div className="container">
      <label>City: </label>
      <input type="text" onChange={props.handleChange} value={props.value}/>
    </div>
  );
}

class ZipCodes extends Component {
  constructor() {
    super();
    this.state = {
      cityInfo: {},
    }
    this.getCityInfoFromZip = this.getCityInfoFromZip.bind(this);
  }

  componentDidMount() {
    this.getCityInfoFromZip();
  }

  getCityInfoFromZip() {
    const cityArr = [];
    fetch('http://ctp-zip-api.herokuapp.com/zip/' + this.props.zip)
      .then( (response) => {
        return response.json();
      })
      .then( (jsonBody) => {
        console.log(jsonBody);

        jsonBody.forEach( obj => {
          if(obj.City === this.props.city.toUpperCase()) {
            this.setState({
              cityInfo: {
                state: obj.State,
                coordinates: '(' + obj.Lat + ', ' + obj.Long + ')',
                population: obj.EstimatedPopulation,
                totalWages: obj.TotalWages,
              }
            })
          }
        });
        //console.log(cityInfo);
      });

      console.log(this.state.cityInfo.state);    
  }

  render() {
    return(
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.zip}
          </div>
          <div className="panel-body">
            <ul>
              <li>State: {this.state.cityInfo.state}</li>
              <li>Estimated Population: {this.state.cityInfo.population}</li>
              <li>Location: {this.state.cityInfo.coordinates}</li>
              <li>Total Wages: {this.state.cityInfo.totalWages}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      city: "",
      ZipCodes: [],
    }
    
    this.cityChanged = this.cityChanged.bind(this);
  }

  cityChanged(event) {
    const city = event.target.value;
    const cityURL = city.toUpperCase();

    if (city.length > 3) {
      fetch('http://ctp-zip-api.herokuapp.com/city/' + cityURL)
      .then((response) => {
        return response.json();
      })
      .then((jsonBody) => {
        console.log(jsonBody);
        const zipCodeList = jsonBody.map( (zipCode) => <ZipCodes zip={zipCode} city={this.state.city}/>);
        this.setState({
          ZipCodes: zipCodeList,
        })

      });
    }

    this.setState({
      city: city,
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField handleChange={this.cityChanged} value={this.state.city}/>
        <div>
          {this.state.ZipCodes}
        </div>
      </div>
    );
  }
}

export default App;
