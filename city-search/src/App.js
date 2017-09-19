import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zip(props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{props.data.LocationText}</h3>
      </div>
      <div className="panel-body">
        <ul>
          <li>{props.data}</li>
         {/* <li>{fetch('http://ctp-zip-api.herokuapp.com/zip/' + props.data)
      			.then((response) => {
      				return response.json();
      			})
      			.then((jsonResponse) => {
      				const state 
      			})}*/}
        </ul>
      </div>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12 form-inline">
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          className="form-control"
          value={props.cityValue}
          onChange={props.handleChange}
          placeholder="Try New York City" />
      </div>
    </div>
  );
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			cityValue: "",
			zips: [],
		}

		this.cityValueChanged = this.cityValueChanged.bind(this);
	}

	cityValueChanged(event) {
		let cityInput = event.target.value;
		const city = cityInput.toUpperCase();
		this.setState({
			cityValue: city,
		})

		if(city.length > 0) {
			fetch('http://ctp-zip-api.herokuapp.com/city/' + city)
			.then((response) => {
				return response.json();
			})
			.then((jsonResponse) => {
				const zips = jsonResponse.map((zip) => {
					return <Zip data={zip} />;
				});

				this.setState({
					zips: zips,
				});
			})
			.catch((e) => {
				this.setState({
					zips: [],
				});
				console.log("In catc: " + e);
			});
		} else {
			this.setState({
				zips: [],
			});
		}
	}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6 col-xs-offset-3">
              <CitySearchField
                cityValue={this.state.cityValue}
                handleChange={this.cityValueChanged} />
              {this.state.zips.length > 0 ? this.state.zips : <div>No Results</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
