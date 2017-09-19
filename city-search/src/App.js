import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function CitySearchField(props) {
  return(
    <div className="container">
      <label>City: </label>
      <input type="text" onChange={props.handleChange} value={props.value}/>
    </div>
  );
}

class ZipCodes extends Component {
  render() {
    return(
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <p>Zip Codes</p>
          </div>
          <div className="panel-body">
            <ul>
              {this.props.zipList.map( (zipCode) => <li>{zipCode}</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      city: "",
      ZipCodes: [],
    }
    
    this.cityChanged = this.cityChanged.bind(this);
  }

  cityChanged(event) {
    const city = event.target.value;
    const cityURL = city.toUpperCase();

    if (city.length > 3) {
      fetch('http://ctp-zip-api.herokuapp.com/city/' + cityURL)
      .then((response) => {
        return response.json();
      })
      .then((jsonBody) => {
        console.log(jsonBody);
        //const tempArry = jsonBody.map( (zip) => zip);
        const zipCodeList = <ZipCodes zipList={jsonBody} />;
        this.setState({
          ZipCodes: zipCodeList,
        })

      });
    }

    this.setState({
      city: city,
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField handleChange={this.cityChanged} value={this.state.city}/>
        <div>
          {this.state.ZipCodes}
        </div>
      </div>
    );
  }
}

export default App;