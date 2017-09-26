import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            {/*City Name - pass endpoint for city name*/}
            <h3 className="panel-title">{props.data.LocationText}</h3>
          </div>

          <div className="panel-body">
            {/*Info about city - pass endpoints for info about city*/}
            <ul>
              <li>State: {props.data.State}</li>
              <li>Location: {props.data.Lat}, {props.data.Long}</li>
              <li>Population (estimated): {props.data.EstimatedPopulation}</li>
              <li>Total Wages: {props.data.TotalWages}</li>
            </ul>
          </div>  
        </div>
      </div>
    </div>);
}

function ZipSearchField(props) {
  return (
    <div className="container-fluid">
      <div className="row"> 
        <div className="col-md-4 col-md-offset-4">
          <div className="form-group">
            <label>Zipcode: </label>
            <input type="text" placeholder="Try 10016" value={props.value} onChange={props.handleChange}></input>
          </div>
        </div>
      </div>
    </div>);
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      zipCode: "",
      cities: []
    }

    // This binds the event handler
    this.zipChanged = this.zipChanged.bind(this);
  }
  
  zipChanged(event) {
    const zip = event.target.value;
    this.setState({
      zipCode: zip
    });

    if (zip.length === 5) {
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip)
        .then((repsonse) => {
          return repsonse.json();
        })
        .then((jsonData) => {
          console.log(jsonData);

          //Prepare new state and pass to setState
          const cities = jsonData.map((obj) => <City data={obj}/>);
            this.setState({
              cities: cities,
            })
        })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField value={this.state.zipCode} handleChange={this.zipChanged}/>
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
