import React, { Component } from 'react';
import './App.css';

function Zip(props) {
  return (
    <div>
      <ul>
        {props.data}
      </ul>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12 form-inline">
        <label htmlFor="city">City: </label>
        <input
          type="text"
          onChange={props.handleChange}
          placeholder="Try SPRINGFIELD" />
      </div>
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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const cityName = event.target.value.toUpperCase();
    this.setState({
      city: cityName,
    })

    fetch('http://ctp-zip-api.herokuapp.com/city/'+cityName)
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        return [];
      }
    })
    .then((jsonResponse) => {
      const zips = jsonResponse.map((z) => { return <Zip data={z} />});

      this.setState({
        zipCodes: zips
      });
    })

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>City Search</h1>
        </div>

        <div className="container-fluid">
          <div className="row">
            {}
            <div className="col-sm-6 col-sm-offset-3">
              <CitySearchField 
                handleChange={this.handleChange} />
                <div>
                  {this.state.zipCodes}
                </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
