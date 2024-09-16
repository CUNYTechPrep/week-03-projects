import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function Zip(props){
  return (
    <div className = "panel - panel-default">
       <div className = "panel-heading">
           <div>
              {props.data}
            </div>
       </div>
       </div>

    );

}

function CitySearchField(props) {
  return (
    <div>
      <label>
          City Search 
        </label>
    <input type = "text" value={props.value} onChange= {props.handleChange} />
  </div>
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      city: ' ',
      zipCode: []
    }

    this.cityChanged=this.cityChanged.bind(this);

  }

  cityChanged(event){
    test.setState({
      city: city

    });
    fetch ("http://ctp-zip-api.herokuapp.com/city/" + city.toUpperCase())
    .then((response) =>{
        return response.json();
    })
     .then((jsonData) =>{
       const zipCode = jsonData.map((obj) => <Zip data={obj} 
        />);
        this.setState ({
          zipCode : zipCode 
         })
      })
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1> City-Search </h1>
        </header>

        <CitySearchField value = {this.state.city} handleChange={this.cityChanged} />
        <div>
          {this.state.zipCode}
          {this.state.state}
      </div>
    </div>
    );
  }
}

export default App;
