import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="panel panel-default">

          <div className="panel-heading">
            <b>{props.data.LocationText}</b>
          </div>
          <div className="panel-body">
            <ul>
              <li>Country: {props.data.Country}</li>
              <li>State: {props.data.State}</li>
              <li>Location: ({props.data.Lat},{props.data.Long})</li>
              <li>Estimated Population: {props.data.EstimatedPopulation}</li>
              <li>Total Wages: {props.data.TotalWages}</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
  );
}

function ZipSearchField(props) {
  return (<div>
    <label><b>Zip Code:</b></label>
    <input type="text" id="zipSearchBox" placeholder="ex.10001" onChange={props.handleChange} value={props.value}/>
  </div>);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: "",
      cities: []
    }
    this.zipCodeChanges = this.zipCodeChanges.bind(this);
  }

  zipCodeChanges(event) {
    const zip = event.target.value;
    if(zip.length === 5){
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip)
        .then((response) => {
          return response.json();
        })
        .then((jsonBody) => {
          const cityComps = jsonBody.map((c) => <City data={c} />);   //parse all the City object and return an array of cities
          this.setState ({
            cities: cityComps
          });
        })
        .catch((err) => {
          this.setState({
            cities: [
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="panel panel-default">
                      <div className="panel-heading"><b>No result</b></div>
                      <div className="panel-body"></div>
                    </div>
                  </div>
                </div>
              </div>
            ]
          });
        });
    }
    this.setState({
      zipCode: zip
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <ZipSearchField handleChange={this.zipCodeChanges} value={this.state.zipCode}/>
            </div>
          </div>
        </div>

        <div>
          {this.state.cities}
        </div>
      </div>
  );
  }
}

export default App;
