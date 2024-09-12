import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zipcode(props) {
  return (<div className="panel panel-default">
    <div className="panel-body">
      <ul>
        <li>{props.zip}</li>
      </ul>
    </div>
  </div>);
}

function CitySearchField(props) {
  return (
    <div>
      <label>City:</label>
      <input type="text" onChange={props.handleQuery} value={props.value}/>
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      zipCodes: [],
    }

    this.cityQueried = this.cityQueried.bind(this);
  }

  cityQueried(event) {
    const city = event.target.value;

    fetch('http://ctp-zip-api.herokuapp.com/city/'+city.toUpperCase())
      .then((response) => {
        return response.json();
      })
      .then((jsonBody) => {
        console.log(jsonBody);

        const zipComps = jsonBody.map((z) => <Zipcode zip={z} />);
        this.setState({
          zipCodes: zipComps
        });
      })
      .catch(function(error) { console.log(error); });

    this.setState({
    city: city
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>City Search</h2>
        </div>
        <CitySearchField handleQuery={this.cityQueried} value={this.state.city}/>
        <div>
          {this.state.zipCodes}
        </div>
      </div>
    );
  }
}

export default App;
