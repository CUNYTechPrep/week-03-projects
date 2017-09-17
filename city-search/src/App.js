import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  return (<div className="panel panel-default">
			<div className="panel-heading"> Zip Code: {props.zip}</div>  
			<div className="panel-body"></div>
		</div>);
}

function ZipSearchField(props) {
	return (<div>
			<input type="text" placeholder="Try Brooklyn" value={props.value} onChange={ (e) => { props.handleChange(e); } } />
			</div>);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: '',
      cities: []
    };
	this.getZip = this.getZip.bind(this); 
  }
  getZip(e) {
	var city = e.target.value.toUpperCase().trim();
	this.setState({
		zipCode: city, 
    });
	console.log(city,city.length);
	console.log("http://ctp-zip-api.herokuapp.com/city/"+city);
	if(city.length >= 4) {
		console.log("Here");
		fetch("http://ctp-zip-api.herokuapp.com/city/"+city)
		.then( (responce) => {
			console.log(responce);
			if (!responce.ok) {
				throw Error(responce.statusText);
        	}
			else{
				return responce.json();
			}
		}).then( (jsonData) => {
			var citiesJson = jsonData.map( (obj) =>{
				console.log(obj);
				return <City zip={obj} />;
			});
			this.setState({
				cities: citiesJson,
			});
		}).catch(function(error) {
        	console.log(error);
    	});
	}
  }
  render() {
    return (
      <div className="App">
        	<div className="App-header">
          		<h2>Zip Code Search</h2>
			</div>
			<div className="container">
				<label><h2> City: </h2></label>
        		<ZipSearchField value={this.state.zipCode} handleChange = {this.getZip} />
				{this.state.cities}
        	</div>
     </div>
    );
  }
}

export default App;
