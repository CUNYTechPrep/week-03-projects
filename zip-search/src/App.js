import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="panel panel-default">
      <div className = "panel-heading">
        {props.data.City}
      </div>
      <div className = "panel-body">
        <ul>
          <li>Estimated Pop: {props.data.EstimatedPopulation} </li>
        </ul>
      </div>
  </div>);
}

function ZipSearchField(props) {
  return (<div>  
      <label>Zip Code: </label>
      <input type="text" value = {props.value} onChange ={props.handleChange} />
  </div>);
}


class App extends Component {

  constructor(props) {
    super();
    this.state = {
      zipCode: "", //Search Text
      cities: [], //Search Results
    }

    this.zipChanged = this.zipChanged.bind(this);
  }

  zipChanged(event){
    const zip = event.target.value;
    this.setState({
      zipCode:zip
    });
    if (zip.length == 5)
    {
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip)
      .then((response)=> {
        return response.json();
      })
      .then((jsonData) => {
        const cities = jsonData.map((obj) => <City data={obj} />);
        this.setState({
          cities: cities
        })
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField value = {this.state.zipCode} handleChange = {this.zipChanged}/>
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
