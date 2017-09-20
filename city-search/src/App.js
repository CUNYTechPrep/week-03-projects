import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zipcode(props) {
	return (
	<div className = "panel panel-default">
	  <div className = "panel-heading">
	  {props.data}
	  </div>
	  <div className = "panel-body">

	  </div>
	</div>);
}

function CitySearchField(props) {
  return (
  <div className= "SeachBar">
	<label class="control-label" for="lg">City: </label>
    <input class="form-control" type="text" value={props.value} onChange={props.handleChange} id="lg" />

  </div>);
}
	
class App extends Component {
  constructor(){
	  super();
	  this.state = {
		  cityName: "",
		  zipCode: []
	  };

	  this.cityChanged = this.cityChanged.bind(this); //Must add this for ES6
  }
  
  cityChanged(event){
	  const city = event.target.value.toUpperCase();
	  this.setState({
		  cityName: event.target.value
	  });
	  
		fetch("http://ctp-zip-api.herokuapp.com/city/"+city)
		  .then(function(response){
			  if(response.ok){
				return response.json();
			  }
		  })
		  .then((jsonData) => {
			  try{
			    const zipCode = jsonData.map((obj) => <Zipcode data={obj} />);
			    this.setState({
			    zipCode: zipCode
			  })
			  }
			  catch(err) {
				console.log("City not found");  
			  }
		  });
	 
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField value ={this.state.cityName} handleChange={this.cityChanged}/>
        <div>
		  {this.state.zipCode}
        </div>
      </div>
    );
  }
}

export default App;
