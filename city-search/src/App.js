import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCode(props) {
  return (
    <div className="container">
      <div className="panel-group col-md-6 col-sm-12 col-md-offset-3">
        <div className="panel panel-primary">
          <div className="panel-heading">{props.data.City}</div>
          <div className="panel-body">
            {props.data}
          </div>
        </div>
      </div>
    </div>
    );
}

function CitySearchField(props) {
  return (
  <div>
    <label>City Name: </label>
    <input type="text" placeholder="Try SPRINGFIELD" onChange={props.handleClick}/>
  </div>
  );
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      city: "",
      zipCodes: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const cityName = event.target.value.toUpperCase();


    fetch("http://ctp-zip-api.herokuapp.com/city/" + cityName)
    .then(response => {return response.json();
    }).then(json => {
      const output = json.map(zipcode => {
        return <ZipCode data={zipcode} />;
      });

      this.setState({
        zipCodes: output
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>ZipCode Search</p>
        </div>
        <p className="App-intro">
          Find out all the zip code within the city
        </p>
        <CitySearchField handleClick={this.handleClick}/>
        {this.state.zipCodes}
      </div>
    );
  }
}

export default App;
