import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  if (props.data === "No Results")
  {
    return (<div className="text-center"> No Results </div>)
  }
  return (
    <div className ="row">
    <div className="col-sm-5">
      <div className="panel panel-default">
        <div className="panel-heading">
          {props.data.City}, {props.data.State}
        </div>
        <div className="panel-body">
          <ul>
            <li>
              State: {props.data.State}
            </li>
            <li>
              Location: ({props.data.Lat}, {props.data.Long})
            </li>
            <li>
              Population: {props.data.EstimatedPopulation}
            </li>
            <li>
              Total Wages: {props.data.TotalWages}
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
    );
}

function ZipSearchField(props) {
  return (
    <div className="text-center">
      <label>Zip Code: </label>
      <input type="number" onChange={props.handleChange} name={props.value} />
    </div>
  );
}

function SetResponse(response) {
  let res = response;
  if (response === "")
  {
    return res;
  }
}

class App extends Component {

   constructor() {
    super();
    this.state = {
      zipCode: "",
      cities: ["No Results"],
    }
    this.zipCodeChange = this.zipCodeChange.bind(this);
  }

  zipCodeChange(event) {
    const zip = event.target.value;
    this.setState({
      zipCode: zip,
    });

      fetch("http://ctp-zip-api.herokuapp.com/zip/"+zip)
      .then((response) => {
        if (response.ok && zip.length === 5){
          return response.json();
        }
        else {
          return ["No Results"];
        }
      })
      .then((jsonData) => {
        const cityComps = jsonData.map(c => {
          return <City data={c} />;
        });
        this.setState({
          zipCode: zip,
          cities: cityComps,
        });
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange ={this.zipCodeChange} value ={this.state.zipCode} />
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  
}}

export default App;
