import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zip(props) {
  return (
    <div>
    
      <div className = "panel-heading">
        {props.data}        
        <div className = "panel-body">
        </div>
      </div>

  
  </div>
    );
}

function CitySearchField(props) {
  return (
      <div className="col-md-6 col-md-offset-5 text-center">
        <label><b>City Name:</b></label>
        <input type="text" id="citySearchBox" onChange={props.handleChange} value={props.value} />
      </div>
    );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      State: [],
      cityName: "",
      zipCodes: []
    }
    this.cityCodeChanges = this.cityCodeChanges.bind(this);
  }

  cityCodeChanges(event) {
    const city = event.target.value.toUpperCase();

    this.setState({
      city: city
    });
  
    if(city.length >= 5){
      fetch("http://ctp-zip-api.herokuapp.com/city/" + city)
       
      .then((response) => {
          return response.json();
      
        }).then((jsonBody) => {          
          const zipCode = jsonBody.map((zip) => <Zip data={zip} />);

          this.setState({
            zipCodes: zipCode
          });
        }).catch((err) => {

        });

      }
        this.setState({
          cityName: city
        });
    
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Name Search</h2>
        </div>
        <CitySearchField handleChange={this.cityCodeChanges} value={this.state.cityName} />
        <div>
          {this.state.zipCodes}
        </div>
      </div>
    );
  }
}

export default App;
