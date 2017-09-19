import React, { Component } from 'react';
import './App.css';

function CitySearchField(props){
  return(
    <div className="row">
      <div className="col-xs-12 from-inline">
        <label htmlFor="city">City Name: </label>
        <input 
          type="text"
          id="city"
          className="from-control"
          value={props.cityName}
          onChange={props.handleKey}
          onKeyPress={props.handleKey}
          placeholder="Try New York"/>
      </div>
    </div>
  )
}

function Zipcode(props) {
  return (
  <div className="container">
    {props.data}
  </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      cityName: "",
      zipcodes: [],
    }
    this.cityKeyPressed = this.cityKeyPressed.bind(this);
  }

  cityKeyPressed(event){
    const city = event.target.value.toUpperCase();

    this.setState({
      cityName: city,
    })
    if(event.key === "Enter"){
    fetch('http://ctp-zip-api.herokuapp.com/city/'+this.state.cityName)
      .then((response) => {
        if(response.ok)
          return response.json();
        else
          return [];
      })
      .then((jsonResponse) => {
        const zipcodes = jsonResponse.map((city) => {
          return <Zipcode data={city}/>
        });

        this.setState({
          zipcodes: zipcodes,
        });
      })
      .catch((e) => {
        this.setState({
          zipcodes: [],
        });
        console.log("In catch: " + e);
      });
    } else {
      this.setState({
      zipcodes: [],
    });
  }
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search App</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <CitySearchField
                cityName={this.state.cityName}
                handleKey={this.cityKeyPressed} />
              {this.state.zipcodes.length > 0 ? this.state.zipcodes : <div>No Results</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
