import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="panel panel-default col-sm-6 col-md-4">
      <div className="panel-heading text-center">
        {props.data.City}
      </div>
      <div className="panel-body">
        <ul>
          <li>Estimated Population: {props.data.EstimatedPopulation}</li>
          <li>State: {props.data.State}</li>
          <li>Longitude: {props.data.Long}</li>
          <li>Latitude: {props.data.Lat}</li>
        </ul>
      </div>
    </div>);
}

function ZipSearchField(props) {
  return (
    <div>
      <label>Zip Code:</label>
      <input type="text" onChange={props.handleChange} value={props.value}/>
    </div>);
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: "",
      cities: []
    }
    this.zipCodeChanged = this.zipCodeChanged.bind(this)
  }

  zipCodeChanged(ev) {
    const zip = ev.target.value
    if(zip.length === 5) {
      fetch('http://ctp-zip-api.herokuapp.com/zip/'+zip)
        .then((response) => {
          return response.json();
        })
        .then((jsonBody) => {
          console.log(jsonBody);

          const cityComps = jsonBody.map((c) => <City data={c} />);

          this.setState({
            cities: cityComps
          })
        });
    }

    this.setState({
      zipCode: zip
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={this.zipCodeChanged} value={this.state.zipCode}/>
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }

  handleChange (ev) {
    return
  }
}

export default App;
