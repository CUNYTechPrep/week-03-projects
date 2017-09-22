import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCodes(props){
  return(
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{props.data.LocationText}</h3>
          </div>
          <div className="panel-body">
              {props.data}
            
          </div>
        </div>
      </div>    
    </div>
  );
}

function CityField(props){
  return(
    <div>
      <h3>Enter a City: </h3>
      <input type='text' 
             value={props.city} 
             onChange={props.handleChange}>
      </input>
      <button onClick={props.handleClick}>Submit</button> 
    </div>
  );
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      zips: [],
      city: null
    }
    this.cityChanged = this.cityChanged.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  cityChanged(event){
    const city = event.target.value;
    this.setState({
      city: city,
    });
  }

  handleClick(){
    const city = this.state.city;

    fetch("http://ctp-zip-api.herokuapp.com/city/"+city.toUpperCase())
    .then((response) => {
    return response.json();
    })
    .then((jsonData) => {
      const zips = jsonData.map((obj) => 
        { return <ZipCodes data={obj}/>; }
      );
      
      this.setState({
        zips: zips,
      })
      console.log(this.state.zips);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>City Search </h3>
        </div>
        <CityField 
          value={this.state.city} 
            handleChange={this.cityChanged} 
            handleClick={this.handleClick}/>
         <div>
           {this.state.zips}
         </div>
      </div>
    );
  }
}


export default App;
