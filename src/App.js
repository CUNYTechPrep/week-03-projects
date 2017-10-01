import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function zipCodes(props) {
  return (
  	<div className="panel panel-default">
  		<div className = "panel-heading">
  		 </div>
  		<div className ="panel-body">
  			<ul>
  				<span>{props.data}</span>

  			</ul>
  		</div>

  	</div>);
}

function CitySearchField(props) {
  return (
  	<div>
  		<label>City :</label>
  		<input type="text" value={props.city} onChange= {props.handleChange}/>
 
  	</div>);
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      zipCode: [],
    }

   this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const cityName = event.target.value.toUpperCase(); 

    this.setState({
      city: cityName,
    })

      fetch('http://ctp-zip-api.herokuapp.com/city/'+cityName)
        .then((response) => {
          if(response.ok) {
            return response.json(); 
          } else {
            return [];
          }
        })
        .then((json) => {
          const zip = json.map((zips) => {
            return <zipCode data={zips}/>; 
          });

          this.setState({
            zipCode: zip,
          });
        })
        .catch((ex) => {
          this.setState({
            zipCode: [],
          });
          console.log("Error in catch " + ex);
        });

}


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField city={this.state.city} handleChange={this.handleChange} /> 
        {this.state.zipCode};
        
      </div>
    );
  }
}

export default App;
