import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className = "panel panel-default"> 
      <div className = "panel-heading">
        {props.data.City}
      </div>
      <div className = "panel-body">
        <ul>
          <li>Zip Code: {props.data}</li>
        </ul>
      </div>
    </div>);
}

function ZipSearchField(props) {
  return (
    <div>
      <label>Zip Code:</label>
      <input type="Text" onChange={props.handleChange} 
        value = {props.value} placeholder = "Try NYC" />
    </div>
    );
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      zipCode: "",
      Cities: [],
    }

    this.zipCodeChanged = this.zipCodeChanged.bind(this)
  }

  zipCodeChanged(event){
    const zip = event.target.value;

    if(zip.length >= 3){
      let zipUpper = zip.toUpperCase();
      fetch('http://ctp-zip-api.herokuapp.com/city/' + zipUpper)
        .then((response) => {
          return response.json();
        })
        .then((jsonBody) => {
          console.log(jsonBody);

          const cityComps = jsonBody.map((c) => <City data={c} />);
          this.setState({
            cities: cityComps
          });
        });
    }

    this.setState({
      zipCode: zip
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange = {this.zipCodeChanged} value = {this.state.zipCode}/>
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
