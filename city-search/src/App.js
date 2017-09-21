import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function Zip(props) {
  return (
    <div className="container">
      {props.data}
    </div>);
}

function ZipSearchField(props) {
  return (
    <div className="container">
      <div className="col-lg-6">
        <div className="input-group">
          <label>City: </label>
          <input type="text" className="form-control" placeholder="Enter Zip Code" 
                onChange={props.handleChange} value={props.value}></input>
        </div>
      </div>
    </div>
    );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCodes: [],
      city: ""
    }
    this.cityChanged = this.cityChanged.bind(this);
  }

  cityChanged(event){
    
    const city = event.target.value;
   

    if(typeof(city) === 'string' && city.length >= 4){
      fetch('http://ctp-zip-api.herokuapp.com/city/' + city.toUpperCase())
        .then((response)=> {
          return response.json();
        })
        .then((jsonBody)=>{
          console.log(jsonBody);
        
        const zipsComponents = jsonBody.map((zip)=>{
          return <Zip data={zip} />
        });
          
        this.setState({  
          zipCodes: zipsComponents 
        });
      });
    }

    this.setState({
      city: city
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <ZipSearchField handleChange={this.cityChanged} value={this.state.city}/>
        <div>
          { this.state.zipCodes }
        </div>
      </div>
    );
  }
}

export default App;
