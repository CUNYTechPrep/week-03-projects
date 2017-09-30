import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  console.log(props);
  if (props.data === "No Results")
  {
    return (<div className="text-center"> No Results </div>)
  }
  return (
    <div className ="row">
    <div className="col-sm-6">
      <div className="panel panel-default">
        <div className="panel-heading">
          Zip Code
        </div>
        <div className="panel-body">
          <ul>
            <li>
              {props.data}
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
    );
}

function CitySearchField(props) {
  return (
    <div className="text-center">
      <label>City: </label>
      <input type="text" onChange={props.handleChange} name={props.value} />
    </div>
  );
}

class App extends Component {

   constructor() {
    super();
    this.state = {
      city: "",
      zipcodes: ["No Results"],
    }
    this.zipCodeSearch = this.zipCodeSearch.bind(this);
  }

  zipCodeSearch(event) {
    const city = event.target.value.toUpperCase();;
    this.setState({
      zipCode: city,
    });

      fetch("http://ctp-zip-api.herokuapp.com/city/"+city)
      .then((response) => {
        if (response.ok){
          return response.json();
        }
        else {
          return ["No Results"];
        }
      })
      .then((jsonData) => {
        const cityComps = jsonData.map(c => {
          return <City data={c} />;
        });
        this.setState({
          city: city,
          zipcodes: cityComps,
        });
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField handleChange ={this.zipCodeSearch} value ={this.state.city} />
        <div>
          {this.state.zipcodes}
        </div>
      </div>
    );
  
}}

export default App;
