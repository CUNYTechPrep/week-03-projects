import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCodes(props) {
  return (
    <div className="panel panel-default col-sm-6 col-md-4">
      <div className="panel-heading text-center">
        {props.title}
      </div>
      <div className="panel-body">
        {props.data}
      </div>
    </div>);
}

function CitySearchField(props) {
  return (
    <div>
      <label>City:</label>
      <input type="text"
        onChange={props.handleChange}
        onKeyPress={props.handleKey}
        value={props.value}/>
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      zipcodes: []
    }
    this.cityKeyPressed = this.cityKeyPressed.bind(this)
    this.cityChanged = this.cityChanged.bind(this)
  }

  cityChanged(ev) {
    const ci= ev.target.value
    this.setState ({
      city: ci
    })
  }

  cityKeyPressed(ev) {
    const ct= ev.target.value.toUpperCase();
    if(ev.key === "Enter"){
      fetch('http://ctp-zip-api.herokuapp.com/city/'+ct)
        .then((response) => {
          return response.json();
        })
        .then((jsonBody) => {
          console.log(jsonBody);

          const zipComps = jsonBody.map((c) => <ZipCodes data={c} title={ct} />);

          this.setState({
            zipcodes: zipComps
          })
        });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to City Search</h2>
        </div>
        <CitySearchField
          handleKey={this.cityKeyPressed}
          handleChange={this.cityChanged}
          value={this.state.city}/>
        <div>
          {this.state.zipcodes}
        </div>
      </div>
    );
  }
}

export default App;
