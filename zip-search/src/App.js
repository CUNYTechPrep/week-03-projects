import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <b>{props.data.LocationText}</b>
            </div>
            <div className="panel-body"> 
              <ul>
                <li>State: {props.data.State}</li>
                <li>Location: ({props.data.Lat}, {props.data.Long})</li>
                <li>Population(estimated): {props.data.EstimatedPopulation}</li>
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
  return (
      <div className="group-form text-center">
        <label><b>Zip Code:</b></label>
        <input type="text" id="zipSearchBox" placeholder="Try 10016" onChange={props.handleChange} value={props.value} />
      </div>
    );
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
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip)
        .then((response) => {
          return response.json();
        }).then((jsonBody) => {
          const cityComps = jsonBody.map((data) => <City data={data} />);
          this.setState({
            cities: cityComps
          });
        }).catch((err) => {

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
        <ZipSearchField handleChange={this.zipCodeChanges} value={this.state.zipCode} />
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;

