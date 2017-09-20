import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  const d = props.data;
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {d.City}
      </div>
      <div className="panel-body">
        <ul>
          <li>State: {d.State}</li>
          <li>Location: ({d.Lat}, {d.Long})</li>
          <li>Population(estimated): {d.EstimatedPopulation}</li>
          <li>Total Wages: {d.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function Zip(props) {
  const d = props.data;
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        {d}
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
      input: "",
      output: [],
    }
    this.cityChanged = this.cityChanged.bind(this);
  }

  cityChanged(event) {
    const input = event.target.value.toUpperCase();
    this.setState({
      input: input,
    });

    if(input.length > 0) {
      fetch("http://ctp-zip-api.herokuapp.com/city/"+input)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        const output = jsonData.map(z => {
          return <Zip data={z} />;
        });
        this.setState({
          input: input,
          output: output,
        });
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div>
          <CitySearchField handleChange={this.cityChanged} value={this.state.input}/>
        </div>
        <div>{this.state.output}</div>
      </div>
    );
  }
}

export default App;
