import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zip(props) {
  /*
  // Removed because not sending any data besides zip
  <div className="panel-body">
    <ul>
      <li>State: {props.data.states[0]}</li>
    </ul>
  </div>
  */
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {props.data}
      </div>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="center-block">
      <form>
        <label>
          City:
          <input type="text" placeholder="City" onChange={props.handleChange} value={props.value}/>
        </label>
      </form>
    </div>
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      zips: []
    }
    this.cityChanged = this.cityChanged.bind(this)
  }

  getZipStates(zip){
    let retval;
    if(zip.length === 5) {
      console.log(zip)
      console.log(typeof(zip))
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip)
        .then((response) => {
          return response.json();
        }).then((jsonBody) => {
          const cityComps = jsonBody.map((city) => (city.state))
          retval = cityComps
        })
    }
    return retval;
  }

  cityChanged(event) {
    const city = event.target.value;

    if(city.length >= 3) {
      console.log(city)
      console.log(typeof(city))
      fetch('http://ctp-zip-api.herokuapp.com/city/' + city.toUpperCase())
        .then((response) => {
          return response.json();
        }).then((jsonBody) => {
          const zipsFound = jsonBody.map((zip) => <Zip data={zip} />)
          console.log("zipsFound",zipsFound)
          this.setState({
            zips: zipsFound
          })

        })
    }

    console.log("this.state.zips", this.state.zips)


    this.setState({
      city: city
    })

    console.log("this.state.zips", this.state.zips)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField value={this.state.cityCode} handleChange={this.cityChanged}/>
        <div>
          {this.state.zips}
        </div>
      </div>
    );
  }
}

export default App;
