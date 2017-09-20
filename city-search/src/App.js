import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function Zip(props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {props.data.City}
      </div>
      <div className="panel-body">
       {props.data}
      </div>
    </div>);
}

function CitySearchField(props) {
  return (<div>
    <label>City</label>
    <input type="text" onChange={props.handleChange} value={props.value}/>
  </div>);
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      zipCodes: []
    };

    this.cityCodeChanged = this.cityCodeChanged.bind(this);
  }

  cityCodeChanged(event){
    let city = event.target.value;

    if (city.length >= 5) {
    fetch('http://ctp-zip-api.herokuapp.com/city/' + city.toUpperCase())
      .then((response) => {
        return response.json();
      })
      .then((jsonBody) => {
        console.log(jsonBody);

        const zipComps = jsonBody.map((c) => <Zip data={c}/>);

        this.setState({
          zipCodes: zipComps
        })
      })
      .catch((err) => {
        console.log("No results")
      })
    };

    this.setState({
      city: city
    })
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>City Code Search</h2>
        </div>
        <CitySearchField handleChange={this.cityCodeChanged} value={this.state.city} />
        <div>
          {this.state.zipCodes}
        </div>
      </div>
    );
  }
}

export default App;
