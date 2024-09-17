import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zip(props) {
  return(
    <div className="panel panel-default">
      <div className="panel-heading">
       <h5>Zip Codes</h5>
      </div>
      <div className = "panel-body">
        <ul>
          <li>{props.data}</li>
        </ul>
      </div>
      </div>
  );
}

function CitySearchField(props) {
  return(<div className="city-field">
  <label> City Name:</label>
    <input type="text" onChange={props.handleChange} value = {props.value} placeholder="Try New York" />
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      cityName: "",
      zipCodes: [],
    }
    this.cityNameChanged = this.cityNameChanged.bind(this);
  }

  cityNameChanged(event) {
    const city = event.target.value;
    if(city != null) {
    fetch('http://ctp-zip-api.herokuapp.com/city/' + city)
      .then((response)=> {
        return response.json();
      })
      .then((jsonBody) => {
        console.log(jsonBody);

      const zipComps= jsonBody.map((c) => <Zip data={c} />);

      this.setState({
        zipCodes: zipComps,
        });
      });
    }
      this.setState({
        cityName: city,
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField handleChange={this.cityNameChanged} value = {this.state.cityName} />
        <div>
          {this.state.zipCodes}
        </div>
      </div>
    );
  }
}

export default App;
