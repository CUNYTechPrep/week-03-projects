import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCodes(props){
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{props.data.City}</h3>
      </div>
      <div className="panel-body">
        {props.data}
      </div>
    </div>
  );
}

function CitySearchField(props){
  return (
    <div className="row">
      <div className="col-xs-12 form-inline">
        <label htmlFor="zip">City: </label>
        <input
          type="text"
          id="zip"
          className="form-control"
          value={props.value}
          onChange={props.handleChange}
          placeholder="Try New York" />
      </div>
    </div>
  );
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      cityValue: "",
      zipCodes: []
    }
    this.cityValueChanged = this.cityValueChanged.bind(this);
  }

cityValueChanged(event){
  let city = event.target.value;

  this.setState({
    cityValue: city,
  })

  if(city.length >= 5){
    fetch('http://ctp-zip-api.herokuapp.com/city/'+city.toUpperCase())
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      const zip = jsonResponse.map((c) => <ZipCodes data={c} />);
      this.setState({
        zipCodes: zip,
      })
    })
    .catch((err) => {
      console.log("no result");
    })
  };
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <CitySearchField
                cityValue={this.state.cityValue}
                handleChange={this.cityValueChanged} />
              {this.state.zipCodes.length > 0 ? this.state.zipCodes : <div>No Results</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
