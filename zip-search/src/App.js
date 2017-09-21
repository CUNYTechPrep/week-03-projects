import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>
            {props.data.City}
            </h4>
          </div>  
          <div className="panel-body">
            <ul>
              <li>State: {props.data.State}</li>
              <li>Location: ({props.data.Lat}, {props.data.Long})</li>
              <li>Est. Population: {props.data.EstimatedPopulation}</li>
              <li>Total Wages: {props.data.TotalWages}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <label>Zip Code:</label>
        <input type ="text" onChange={props.handleChange} value={props.value}/>
      </div> 
      <div className="col-md-4"></div>
    </div>
  );
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      cities: [],
      zipCode: ""
    };
    this.zipCodeChanged = this.zipCodeChanged.bind(this);
  }

  zipCodeChanged (event) {
    const zip = event.target.value;

    if(zip.length === 5) {
      fetch('http://ctp-zip-api.herokuapp.com/zip/'+zip)
      .then((response) =>{
        return response.json();
      })
      .then((jsonBody) => {
        console.log(jsonBody);
        const cityComps = jsonBody.map((city) => <City data = {city} />);
        this.setState({
          cities: cityComps
        });
      }) 
    }

    this.setState({
      zipCode: zip
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Code Search</h2>
        </div>
        <ZipSearchField handleChange={this.zipCodeChanged} value={this.state.zipCode}/>
        <div className = "panel">
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
