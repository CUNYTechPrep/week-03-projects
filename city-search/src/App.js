import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
	return(
		<div>
			{props.data}
		</div>
	);
}


function ZipCodes(props) {
	return(
		<div>
			{props.zVal}
		</div>
	);
}

function CitySearchField(props) {
	return(
		<div>
			<label>City Name: </label>
			<input type = "text"
					id = "city"
					className="form-control"
					value={props.cityValue}
					onChange={props.handleChange}
					placeholder = "Try New York"
					/>
		</div>

	);
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			cityValue: "",
			zipValues: [],

		}

		this.eachZip = {
			zipValue: "",
			cities: [],
		}


		this.cityValueChanged = this.cityValueChanged.bind(this);

	}

	cityValueChanged(event) {
		const city = event.target.value;
		let zipcodes = [];
		this.setState({	
			cityValue: city
		})

		fetch('http://ctp-zip-api.herokuapp.com/city/' + city.toUpperCase())
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					return [];
				}

			})
			.then((jsonResponse) => {
			 	 zipcodes = jsonResponse.map((zips) => {
					return <ZipCodes zVal= {zips} />;
				});
				this.setState({
					zipValues: zipcodes,
				});
			})
			.catch((e) => {
				console.log("Exception: " + e);
			});

		zipcodes.forEach((element) => {
			fetch('http://ctp-zip-api.herokuapp.com/zip/' + element)
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						return [];
					}
				})
				.then((jsonResponse) => {
					const cities = jsonResponse.map((city) => {
						return <City data={cities}/>;
					});
					this.setEachZip({
						cities:cities,
					});
				})
				.catch((ex) => {
					console.log("Exception: " + ex);
				});

		});
	}


  	render() {
    	return (
      	<div className="App">
        	<div className="App-header">
          		<img src={logo} className="App-logo" alt="logo" />
          		<h2>Welcome to React</h2>
        	</div>
        	<div>
        		<CitySearchField 
        			cityValue={this.state.cityValue}
        			handleChange={this.cityValueChanged} />
        			{this.state.zipValues}
        			{this.eachZip.cities}
        	</div>
      	</div>
    );
  }
}

export default App;
