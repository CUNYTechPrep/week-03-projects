import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div>
    <h3>{props.data.City}</h3>
    <ul>
      <li>State : {props.data.State}</li>
      <li>Location : ({props.data.Lat},{props.data.Long})</li>
      <li>Population (estimated) : {props.data.EstimatedPopulation}</li>
      <li>Total Wages : {props.data.TotalWages}</li>
    </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (<div>
      <b>ZipCode : </b>
      <input type = "text" 
        placeholder = "Try 10016"
        id = "city"
        className = "form-control"
        value={props.zipCode}
        onChange={props.handleChange} />
  </div>);
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      zipValue: "",
      cityValues: [],
    }

    this.zipValueChanged = this.zipValueChanged.bind(this);

  }

  zipValueChanged(event) {
    const zipCode = event.target.value;
    let cityValues = [];
    this.setState({
      zipValue: zipCode
    })

    fetch('http://ctp-zip-api.herokuapp.com/zip/' + zipCode)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .then((jsonResponse) => {
        const cities = jsonResponse.map((cityData) => {
          return <City data = {cityData} />;
        });
        this.setState({
          cityValues: cities,
        });
      })
      .catch((e) => {
        console.log("Exception: " + e);
      });  

  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField 
          zipCode={this.state.zipValue}
          handleChange={this.zipValueChanged} />
        <div>
          {this.state.cityValues.length > 0 ? this.state.cityValues : <div>No Results</div>}
        </div>
      </div>
    );
  }
}

export default App;
