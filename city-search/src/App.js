import React, { Component } from 'react';
import './App.css';

function ZipCode(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading text-center">
              {props.city}
            </div>
            <div className="panel-body">
              <ol>{props.zipCode}</ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <form>
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="input-group">
            <input type="text" className="form-control" value={props.value} placeholder="city name" onChange={props.handleChange} />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">Search</button>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      zipCode: [],
    }
    this.citySearch = this.citySearch.bind(this);
  }

  citySearch(event) {
    const city = event.target.value;
    if(city.length >= 3) {
      fetch('http://ctp-zip-api.herokuapp.com/city/' + city.toUpperCase())
        .then(response => {
          return response.json()  // convert to json and return
        })
        .then(jsonBody => {
          const zipCode = jsonBody.map(zip => <li>{zip}</li>);
          this.setState({
            zipCode
          });
        })
        .catch(error => {
          this.setState({
            zipCode: [
              <div className="text-center">
                <h2>no results</h2>
              </div>
            ]
          });
        });
    }
    this.setState({
      city
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField handleChange={this.citySearch} value={this.state.city} />
        <div>
          <ZipCode city={this.state.city} zipCode={this.state.zipCode} />
        </div>
      </div>
    );
  }
}

export default App;
