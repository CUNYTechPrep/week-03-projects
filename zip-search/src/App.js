import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="panel panel-default">
       <div className="panel-heading">
          <h5>{props.data.City} , {props.data.State}</h5>
        </div>
        <div className="panel-body">
          <ul>
            <li>State: {props.data.State}</li>
            <li>Location: ({props.data.Lat} , {props.data.Long})</li>
            <li>Est. Population: {props.data.EstimatedPopulation}</li>
            <li>Total Wages: {props.data.TotalWages}</li>
          </ul>
        </div>
    </div>);
}

function ZipSearchField(props) {
  return (<div className="zip-field">
    <label> Zip Code:</label>
      <input type="text" onChange={props.handleChange} value={props.value} placeholder= "Try 10016"/>
    </div>);
}


class App extends Component {
  constructor() {
    super();
    this.state= {
      zipCode: "",
      cities: [] ,
    }
    this.zipCodeChanged = this.zipCodeChanged.bind(this);
  }

  zipCodeChanged(event) {
    const zip = event.target.value;

    const noResults = (
      <p>No Results</p>
    );

    if(zip.length === null) {
      return noResults;
    } else if(zip.length === 5) {
    fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip)
      .then((response)=> {
        return response.json();
      })
      .then((jsonBody) => {
        console.log(jsonBody);

      const cityComps= jsonBody.map((c) => <City data={c} />);

      this.setState({
        cities: cityComps
        });
      });
    }

    this.setState({
      zipCode: zip,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={this.zipCodeChanged} value={this.state.zipCode}/>
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
