import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function Zips(props){
  return(
    <div className = "panel panel-default">
      <div className = "panel-heading">
        
      </div>
      <div className = "panel-body">
          Zip: {props.data}
      </div>
    </div>);
}


function CitySearchField(props) {
  return (
    <div>
      <label>City Name: </label>
      <input type="text" value = {props.value} onChange = {props.handleChange}/>
    </div>
    );
}


class App extends Component {

  constructor(props){
    super();
    this.state = {
      cityName: "",
      zipCodes: [],
    }

    this.cityChanged = this.cityChanged.bind(this);
  }


  cityChanged(event){
    const city = event.target.value;
    this.setState({
      cityName:city
    });
    if (city.length > 2)
    {
      fetch("http://ctp-zip-api.herokuapp.com/city/" + city)
      .then((response)=>
      {
        return response.json();
      })
      .then((jsonData) =>
      {
        const zips = jsonData.map((obj) => <Zips data = {obj} />);
        this.setState({
          zipCodes: zips
        })
      });
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>City Search</h2>
        </div>
        <CitySearchField value = {this.state.cityName} handleChange = {this.cityChanged} />
        <div>
          {this.state.zipCodes}
        </div>
      </div>
    );
}
  }

export default App;
