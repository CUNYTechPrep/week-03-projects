import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="tile">
      <div className = "tile-header">
        {props.data.City}
      </div>
      <div className = "tile-body">
        <ul>
          <li>Est. Population: {props.data.EstimatedPopulation}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
      <label>Zip Code: </label>
      <input type='text' onChange = {props.handleChange} value={props.value} />
    </div>
  );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: '',
      cities: []
    }

    this.zipCodeChanged = this.zipCodeChanged.bind(this);
  }

  zipCodeChanged(event){
    const zip = event.target.value;

    if(zip.length === 5){
      fetch('http://ctp-zip-api.herokuapp.com/zip/'+zip)
        .then( (response) => {
          return response.json();
        })
        .then((jsonBody) => {
          console.log(jsonBody);

          //city components being built by the jsonBody
          const cityComps = jsonBody.map( (c) => <City data={c} />);
          this.setState({
            cities: cityComps
          });
        });
    }
    this.setState({
      zipCode: zip
    })
  }

  

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={this.zipCodeChanged} value={this.zipCode} />
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }


}

export default App;
