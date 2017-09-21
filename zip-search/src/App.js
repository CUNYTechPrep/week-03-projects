import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let testCity = {
	City : "NEW YORK",
	Country : "US",
	Decommisioned : "false",
	EstimatedPopulation : "40683",
	Lat : "40.71",
	Location : "NA-US-NY-NEW YORK",
	LocationText : "New York, NY",
	LocationType : "PRIMARY",
	Long : "-73.99",
	Notes : "",
	RecordNumber : "240",
	State : "NY",
	TaxReturnsFiled : "31673",
	TotalWages : "1412438620",
	WorldRegion : "NA",
	Xaxis : "0.20",
	Yaxis : "-0.72",
	Zaxis : "0.65",
	ZipCodeType : "STANDARD",
	Zipcode : "10016",
}

function SearchResults(props) {
	let results;
	if (props.results === null) {
		results = <p>No Results Found</p>
	} else {
		results = props.results.map(city => City(city));
	}
	return (
		<div className="search-results">
			{results}
		</div>
	);
}

// Accepts a single object which represents a city. These objects are
// produced by the city-zip API.
function City(props) {
  return (
		<div className="city">
			<div key={props.RecordNumber} className="result-header">
				{props.LocationText}
			</div>
			<div className="result-body">
				<ul>
					<li>State: {props.State}</li>
					<li>Location: ({props.Lat}, {props.Long})</li>
					<li>Population (estimated): {props.EstimatedPopulation}</li>
					<li>Total Wages: {props.TotalWages}</li>
				</ul>
			</div>
		</div>
	);
}

function ZipSearchField(props) {
	let showResults = ((e) => {
		//console.log("The event is:", e.charCode);
		if (e.charCode !== 13) return;
		//console.log("It's happening!");
		let zip = document.querySelector('input').value;
		//console.log(`Zip code: ${zip}`);
		//console.log(props.showResults);
		getResults(zip)
			.then(props.showResults)
	})
  return (
		<div className="form-horizontal">
			<div id="zip-entry" className="form-group">
				<label htmlFor="zip">Zip Code:</label>
				<input 
					name="zip" 
					placeholder="Zip Code..."
					onKeyPress={showResults}
					className="form-control"
					/>
			</div>
		</div>
	);
}

function getResults(zip) {
	let url = "http://ctp-zip-api.herokuapp.com/zip/";
	return (
		fetch(url + zip)
			.then(response => {
				console.log("Got the results.");
				console.log("Response:", response);
				if (response.ok) {
					return response.json();
				} else {
					return null;
				}
			})
	);
}


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {results: [testCity]};
		this.feedResults = (results => this.setState({results}));
	}
  render() {
		let {results} = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
				<div id="search">
					<ZipSearchField showResults={this.feedResults}/>
					<SearchResults id={"results"} results={results} />
				</div>
      </div>
    );
  }
}

export default App;

// First idea:
// - Once fetching the results has finished, the results become the
//   state of a result set. Several cities are then rendered based on
//   the state.

// Second Idea:
// - Just keep calling React.renderDOM after the fetch function has
//   finished.

/* Fields of a city:
City
Country
Decommisioned
EstimatedPopulation
Lat
Location
LocationText
LocationType
Long
Notes
RecordNumber
State
TaxReturnsFiled
TotalWages
WorldRegion
Xaxis
Yaxis
Zaxis
ZipCodeType
Zipcode
*/
