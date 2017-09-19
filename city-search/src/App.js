import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function ZipCode(props) {
  return (<td className="list-group-item">{props.data}</td>);
}

function CitySearchField(props) {
  return (
    <div className="row">
      <div className="input-group col-xs-6 col-sm-6 col-md-4 col-xs-offset-3 col-sm-offset-3 col-md-offset-4" id="input-field">
        <label>City name:</label>
        <input type="text" className="form-control" placeholder="Search city" value={props.value} onChange={props.handleChange}/>
      </div>
    </div>
    );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      zipcodes: []
    };
    this.citySet = this.citySet.bind(this);
  }

  citySet(event) {
    const city = event.target.value.toUpperCase();
    this.setState({
      city: city
    });
   
    fetch("http://ctp-zip-api.herokuapp.com/city/"+city)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => { // jsonData is array of objects
        const zipcodes = jsonData.map((obj) => <ZipCode data={obj}/>); // Look at every object in array, transform and put it back
        this.setState({
          zipcodes: zipcodes,
        })
      });
    
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField value={this.state.city} handleChange={this.citySet}/>
        <div className="container">
          <div className="row">
            <div className="col-xs-8 col-sm-8 col-md-6 col-xs-offset-2 col-sm-offset-2 col-md-offset-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>Zip Codes</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.zipcodes}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
