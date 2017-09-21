import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="container">
      <div className="panel-group col-md-6 col-sm-12 col-md-offset-3">
        <div className="panel panel-primary">
          <div className="panel-heading">{props.data.City}</div>
          <div className="panel-body">
            <ul>
              <li>State: {props.data.State}</li>
              <li>Location: {props.data.Location}</li>
              <li>Population: {props.data.EstimatedPopulation}</li>
              <li>Total Wages: {props.data.TotalWages}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    );
}

function ZipSearchField(props) {
  return (
  <div>
    <label>Zip Code: </label>
    <input type="text" placeholder="Try 10013" onChange={props.handleClick}/>
  </div>
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      zipCode: "",
      cities: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const zip = event.target.value;
    
    if(zip.length === 5){

      fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip)
      .then(response => {return response.json();
      }).then((jsonData) => {
        const output = jsonData.map(city => {
          return <City data={city} />;
        });

        this.setState({
            cities: output
        });

      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleClick={this.handleClick}/>
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
