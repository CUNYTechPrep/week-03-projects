import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function SearchResults(props) {
	let results;
	if (props.results === null) {
		results = <p>No Results Found</p>
	} else {
		results = props.results.map(props.resultMap);
	}
	return (
		<div className="search-results">
			{props.results ? "Results Found: " + results.length : ""}
			{results}
		</div>
	);
}

// Accepts a single object which represents a city. These objects are
// produced by the city-zip API.
function ZipCode(zipcode) {
  return (
		<li>{zipcode}</li>
	);
}

// Props:
// - onEnter: A function to run when the enter key is pressed.
class SearchField extends Component {
	constructor(props) {
		super(props);
		this.handleEnter = this.handleEnter.bind(this);
		if (props.onEnter) {
			this.onEnter = props.onEnter;
		}
	}
	handleEnter(event) {
		if (event.charCode !== 13) return;
		if (this.onEnter) this.onEnter();
	}
	render() {
		const { props.onEnter, ...otherProps } = this.props;
		return (
			<input
				onKeyPress={this.handleEnter}
				// Pass through the rest of the props.
				{...otherProps}
				/>
		);
	}
}

function CitySearchField(props) {
	let showResults = () => {
		let city = document.querySelector('input').value;
		getResults(city)
			.then(props.showResults)
	}
  return (
		<div className="form-horizontal">
			<div id="city-entry" className="form-group">
				<label htmlFor="city">City:</label>
				<SearchField
					name="city" 
					placeholder="City Name..."
					onEnter={showResults}
					className="form-control"
					/>
			</div>
		</div>
	);
}


function getResults(city) {
	let url = "http://ctp-zip-api.herokuapp.com/city/";
	console.log(city.toUpperCase());
	return (
		fetch(url + city.toUpperCase())
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
		this.state = {results: null};
		this.feedResults = (results => this.setState({results}));
	}
  render() {
		let {results} = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
				<div id="search">
					<CitySearchField showResults={this.feedResults}/>
					<SearchResults 
						id="results"
						results={results}
						resultMap={ZipCode}
						/>
				</div>
      </div>
    );
  }
}

export default App;
