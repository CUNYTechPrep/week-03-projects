import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
	function numberWithCommas(x) {
		console.log(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	let pop = numberWithCommas(props.data.EstimatedPopulation);
	let wages = numberWithCommas(props.data.TotalWages );
  return (<div className="panel panel-default">
			<div className="panel-heading">{props.data.City}</div>  
			<div className="panel-body">
			<h4> Population: {pop}</h4>
			<h4> TotalWages: {wages} </h4>
			<h4> TaxReturnsFiled: {props.data.TaxReturnsFiled} </h4>
			</div>
		</div>);
}

function ZipSearchField(props) {
	return (<div>
			<input type="text" placeholder="Try 10016" value={props.value} onChange={ (e) => { props.handleChange(e); } } />
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
	var zip = e.target.value;
	this.setState({
		zipCode: zip, 
    });
	if(zip.length == 5) {
		fetch("http://ctp-zip-api.herokuapp.com/zip/"+zip)
		.then( (responce) => {
			return responce.json();
		})
		.then( (jsonData) => {
			var citiesJson = jsonData.map( (obj) =>{
				console.log(obj);
				return <City data={obj} />;
			});
			this.setState({
				cities: citiesJson,
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
			<div className="container">
				<label><h2> Zip Code: </h2></label>
        		<ZipSearchField value={this.state.zipCode} handleChange = {this.getZip} />
				{this.state.cities}
        	</div>
     </div>
    );
  }
}

export default App;
