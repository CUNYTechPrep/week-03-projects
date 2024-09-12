import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zip(props) {
	return (
		<div className="panel panel-default">
	        <div className="panel-body">
	        	<div> {props.data} </div>
	        </div>
        </div>
	);
}

function CitySearchField(props) {
	return (
		<div>
			<label>
				City Search:
			</label>
			<input type="text" value={props.value} onChange={props.handleChange} />
		</div>
	);
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state={
			city: "",
			zipCode: [],
			states: [],
		};

		this.cityChanged=this.cityChanged.bind(this);
	}

	cityChanged(event) {
		const city = event.target.value.toUpperCase();
		this.setState({
			city: city
		});

		fetch("http://ctp-zip-api.herokuapp.com/city/" + city)
		.then((response) => {
			return response.json();
		})

		.then((jsonData) => {
			const zipCode = jsonData.map((obj) => <Zip data={obj} />);
			this.setState({
				zipCode: zipCode
			})
		})
	}
  	render() {
	    return (
	      	<div className="App">
	       		<div className="App-header">
	          		<img src={logo} className="App-logo" alt="logo" />
	          		<h1>City Search</h1>
	        	</div>

	        	<CitySearchField value={this.state.city} handleChange={this.cityChanged} />
	        	<div>
	        		{this.state.zipCode}
	        		{this.state.state}
	        	</div>
	      	</div>
	    );
  	}
}

export default App;
