import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function ZipCodes(props) {
  return (
      <div className = "zip-entry">
       {props.data}, 
      </div>
  );
}

function CitySearchField(props) {
  return (
    <div className = "block-wrap">
      <label>City: </label>
      <input className="light-blue" type='text' onChange = {props.handleChange} value={props.value} />
    </div>
  );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      zipCodes: []
    }

    this.cityChanged = this.cityChanged.bind(this);
  }

  cityChanged(event){
    const cite = event.target.value.toUpperCase();

    if(cite.length >= 3){
      fetch('https://ctp-zip-api.herokuapp.com/city/'+cite)
        .then( (response) => {
          return response.json();
        })
        .then((jsonBody) => {
          console.log(jsonBody);

          //city components being built by the jsonBody
          const zipComps = jsonBody.map( (c) => <ZipCodes data={c} />);
          this.setState({
            zipCodes: zipComps
          });
        });
    }
    this.setState({
      city: cite
    })
  }

  

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField handleChange={this.cityChanged} value={this.city} />
        <div className = 'block-wrap'>
          Results for: {this.state.city}
          <p className = 'zip-block'>
          {this.state.zipCodes}
          </p>
        </div>
      </div>
    );
  }


}

export default App;
