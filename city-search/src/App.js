import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCode(props) {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{props.data.LocationText}</h3>
          </div>
          <div className="panel-body">
            <ul>
              <li>{props.data}</li>  
              
              {/* You can add any other data points you want here */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12 form-inline">
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          className="form-control"
          value={props.cities}
          onChange={props.handleChange}
          placeholder="Try Brooklyn" />
      </div>
    </div>
  );
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      cities: "",
      zipValue : [],
    }
    this.cityValueChanged = this.cityValueChanged.bind(this);
  } 
  

  cityValueChanged(event) {
    const city = event.target.value;

    this.setState({
      cities: city,
    })
        const cityupper = city.toUpperCase();
        if(city.length > 0){
        fetch('http://ctp-zip-api.herokuapp.com/city/'+ cityupper)
        .then((response) => {
          if(response.ok) {
            return response.json();
          } else {
            return [];
          }
          /*
            if we were to just return response.json() here
            then an exception will be thrown if there is an 
            error, and the catch() function below would execute.
            The exception occurs because the API does not return 
            a proper json body when a 404 occurs.
          */
        })
        .then((jsonResponse) => {
          const zips = jsonResponse.map((zip) => {
            return <ZipCode data={zip} />;
          });

          this.setState({
            zipValue: zips,
          });
        })
        .catch((e) => {
          this.setState({
            ZipValue: [],
          });
          console.log("In catch: " + e);
        });
     }
     else {
      this.setState({
        zip:[],
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
            {/* the following classes centers the 6 columns */}
            <div className="col-sm-6 col-sm-offset-3">
              <CitySearchField
                cities={this.state.cities}
                handleChange={this.cityValueChanged} />
              {this.state.zipValue.length > 0 ? this.state.zipValue : <div>No Results</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
