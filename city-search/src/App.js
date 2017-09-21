import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zip(props) {
  return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>
            {props.data}
            </h4>
          </div>  
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <label>City Name:</label>
        <input type ="text" onChange={props.handleChange} value={props.value}/>
      </div> 
      <div className="col-md-4"></div>
    </div>
  );
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      cityName:"",
      zipCodes: []
    };
    this.enteredCity = this.enteredCity.bind(this);
  }

  enteredCity(event){
    const city = event.target.value;

    fetch('http://ctp-zip-api.herokuapp.com/city/'+city.toUpperCase())
    .then((response) => {
      if(response.ok){
        return response.json();
      }
      else{
        return [];
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      const zips = jsonResponse.map((zip) => <Zip data = {zip} />); 
      this.setState({
        zipCodes: zips
      });
    })

    this.setState({
      cityName: city
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>City Search</h1>
        </div>
        <CitySearchField handleChange={this.enteredCity} value={this.state.cityName}/>
        <div>
          {this.state.zipCodes}
        </div>
        
      </div>
    );
  }
}

export default App;


        // <div>
        //   {this.state.zipCodes}
        // </div>