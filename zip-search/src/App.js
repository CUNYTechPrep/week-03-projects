import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="container">
      <div className="panel panel-primary">
        <div className="panel-heading">
         {props.data.City}
        </div>
        <div className="panel-body">
          <ul>
            <li>State: {props.data.State}</li>
            <li>EstimatedPopulation: {props.data.EstimatedPopulation}</li>
          </ul>
        </div>
      </div>
    </div>);
}

function ZipSearchField(props) {
  return (
    <div className="container">
      <div className="col-lg-6">
        <div className="input-group">
          <label>Zip Code: </label>
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
      zipCode: "",
      cities: []
    }
    this.zipCodeChanged = this.zipCodeChanged.bind(this);
  }

  zipCodeChanged(event){
    
    const zip = event.target.value;

    if(zip.length === 5){
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip)
       .then((response)=> {
        return response.json();
        })
      .then((jsonBody)=>{
        console.log(jsonBody);
        
        const cityComponents = jsonBody.map((city)=>{
          return <City data={city} />
        });
        
        this.setState({  
          cities: cityComponents 
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
        <ZipSearchField handleChange={this.zipCodeChanged} value={this.state.zipCode}/>
        <div>
          { this.state.cities }
        </div>
      </div>
    );
  }
}

export default App;
