import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (<div>
            <div className="panel panel-body">
              <label>{props.city.City}</label>
              <ul>
                <li>State: {props.city.State}</li>
                <li>Location: {props.city.Location}</li>
                <li>Population (Estimated): {props.city.Population}</li>
                <li>Total Wages: ${props.city.TotalWages}</li>
              </ul>
            </div>
          </div>);
}

function Zip(props) {
  console.log(props);
  return <li>Zip: {props.zip}</li>;
}

function ZipSearchField(props) {
  return (<div className="form-group">
            <label>Search by Zip Code</label>
            <input type="text" className="form-control" id="usr-1" onChange={props.onZipPanelChange} value={props.value} />
          </div>);
}

function CitySearchField(props) {
  return(
    <div className="form-group">
      <label>Search by City Name</label>
      <input type="text" className="form-control" id="usr-2" onChange={props.onCityPanelChange} value={props.value} />
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.onZipCodeChange = this.onZipCodeChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);

    this.state = {
      zipCode: [],
      cities: []
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code/City Search</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <ZipSearchField onZipPanelChange={this.onZipCodeChange} />
              <div className="panel-group">
                {this.renderCities()}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <CitySearchField onCityPanelChange={this.onCityChange} />
              <div className="panel-group">
                <div className="panel panel-body">
                  <label>{this.renderZipLabel()}</label>
                  <ol>
                    {this.renderZips()}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderZipLabel() {
    if(this.state.zipCode.length > 0) {
      return "Possible Zip Codes";
    }
  }

  renderCities() {
    let cities = [];
    this.state.cities.forEach(city => {
      cities.push(<City city={city} key={city.Location} />);
    });
    return cities;
  }

  renderZips() {
    let zips = [];
    this.state.zipCode.forEach((zip, zipIndex) => {
      zips.push(<Zip zip={zip} zipIndex={zipIndex} key={zip} />);
    });
    return zips;
  }

  onZipCodeChange(evt) {
    const zip = evt.target.value;
    if(zip.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
        .then(response => response.json())
        .then(jsonBody => {
          console.log(jsonBody);
          let cities = jsonBody.map(city => {
            return city = {
              City: city.City,
              State: city.State,
              Location: city.Location,
              Population: city.EstimatedPopulation,
              TotalWages: city.TotalWages
            };
          });
          console.log(cities);
          this.setState({
            zipCode: this.state.zipCode,
            cities: cities
          }); 
        })
        .catch(err => console.log(err));
    }
    else {
      this.setState({
        zipCode: this.state.zipCode,
        cities: []
      });
    }
  }

  onCityChange(evt) {
    const cityName = evt.target.value.toUpperCase();
    if(cityName.length > 0) {
      fetch(`http://ctp-zip-api.herokuapp.com/city/${cityName}`)
      .then(response => response.json())
      .then(jsonBody => {
        console.log(jsonBody);
        this.setState({
          zipCode: jsonBody,
          cities: this.state.cities 
        });
      })
      .catch(err => console.log(err));
    }
  }
}

export default App;
