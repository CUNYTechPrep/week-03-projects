import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCode(props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {props.data}
      </div>
    </div>);
}

function CitySearchField(props) {
  return (
    <div className="container-fluid">
      <div className="row"> 
        <div className="col-md-4 col-md-offset-4">
          <div className="form-group">
            <label>City: </label>
            <input type="text" placeholder="Try New York" value={props.value} onChange={props.handleChange}></input>
          </div>
        </div>
      </div>
    </div>);
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      city: "",
      zipCodes: []
    }
    this.cityChanged = this.cityChanged.bind(this);
  }

  cityChanged(event) {
    const city = event.target.value.toUpperCase();
    this.setState({
      city: city
    });

    fetch("http://ctp-zip-api.herokuapp.com/city/" + city)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData);


        const zipCodes = jsonData.map((obj) => <ZipCode data={obj}/>);
        this.setState({
          zipCodes: zipCodes,
        })
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField value={this.state.city} handleChange={this.cityChanged}/>
        <div>
          {this.state.zipCodes}
        </div>
      </div>
    );
  }
}

export default App;
