import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  const c = props.entry;
  return (
    <div className="panel panel-default">
      <div className="panel-heading">{c.City}, {c.State}</div>
      <ul class Name="panel-body">
        <li>State: {c.State}</li>
        <li>Location: ({c.Lat}, {c.Long})</li>
        <li>Population(estimated): {c.EstimatedPopulation}</li>
        <li>Total Wages: {c.TotalWages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="input-field">
        <label className="input-box-text">{props.labelText}</label>
        <input className="input-box" type="text" onChange={props.handleChange} name={props.value} />
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      outputs: [],
      searchType: 0,
    }
    this.zipChanged = this.zipChanged.bind(this);
    this.onTypeButtonClick = this.onTypeButtonClick.bind(this);
  }

  zipChanged(event) {
    const userInput = event.target.value.toUpperCase();
    const extension = ((this.state.searchType === 0) ? "zip/" : "city/");
    let outputs = <div className="no-result">No Result</div>;

    if((userInput.length === 5 && this.state.searchType === 0) || this.state.searchType === 1) {
      fetch("http://ctp-zip-api.herokuapp.com/"+extension+userInput)
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          if (this.state.searchType === 0) {
            outputs = jsonData.map(c => {
              return <City entry={c} />;
            });
          } else {
            outputs = jsonData.map(c => {
              return <label className="slot">{c}</label>;
            });
            outputs = <div className="zip-table">{outputs}</div>;
          }
          this.setState({
            input: userInput,
            outputs: outputs,
          })
        })
        .catch((error) => {
          this.setState({
            outputs: <div className="no-result">No Result</div>,
          })
        })  
    } else {
      this.setState({
        outputs: outputs,
      })
    }
  }

  onTypeButtonClick() {
    this.setState({
      searchType: (this.state.searchType === 0) ? 1 : 0,
    })
  }

  render() {
    const buttonText = (this.state.searchType === 0) ? "Search by City for Zip-Codes" : "Search by Zip-Code for Cities";
    const labelText = (this.state.searchType === 0) ? "Zip Code: " : "City Name: ";
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="user-field">
          <button className="search-type-button" onClick={this.onTypeButtonClick}>{buttonText}</button>
          <ZipSearchField handleChange={this.zipChanged} value={this.state.input} labelText = {labelText} />
        </div>
        <div>{this.state.outputs}</div>
      </div>
    );
  }
}

export default App;
