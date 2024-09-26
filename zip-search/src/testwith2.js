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
      cities: [],
      city: '',
      zipCodes: []
    }

    this.zipCodeChanged = this.zipCodeChanged.bind(this);
    this.searchFieldCodeChanged = this.searchFieldChanged.bind(this);
  }

  zipCodeChanged(zips){
    const zip = zips;

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

  cityChanged(event){
    const cit = event.target.value;

    https://ctp-zip-api.herokuapp.com/city/

      fetch('https://ctp-zip-api.herokuapp.com/city/'+cit)
        .then( (response) => {
          return response.json();
        })
        .then((jsonBody) => {
          console.log(jsonBody);

          //city components being built by the jsonBody
          const zipComps = jsonBody.map( (c) => <City data={c} />);
          this.setState({
            zipCodes: zipComps
          });
        });
    
    this.setState({
      city: cit
    })
  }

  searchFieldChanged(event){
    const change = event.target.value;

    
      if(change.length === 5)
        this.zipCodeChanged(change);
    
    if(typeof change[0] === 'string'){

    }


  }

  

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={this.searchFieldChanged} value={this.zipCode} />
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }


}

export default App;
