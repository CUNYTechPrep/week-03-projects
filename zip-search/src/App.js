import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
//  console.log(props);
  return (
    <div className="row col-md-4  col-md-offset-4">
      <div className="panel panel-default text-left">
        <div className="panel-heading">
          {props.values.LocationText}
        </div>
        <div className="panel-body">
          <ul>
            <li>State: {props.values.State}</li>
            <li>Location: ({props.values.Lat}, {props.values.Long})</li>
            <li>Population (estimated): {props.values.EstimatedPopulation}</li>
            <li>Total Wages: {props.values.TotalWages}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

class CityList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.cities.length > 0) {
      let cityList = this.props.cities.map((city, i) => {
        return (
          <City key={i} values={city} />
        );
      });
      return (
        <div>
          {cityList}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

class ZipSearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      results: []
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({
      zipcode: event.target.value
    });

    const zipcodeField = event.target.value;
    console.log(zipcodeField);
    this.setState({zipcode: zipcodeField});
    if (zipcodeField.length === 5) {
      const url = `http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`;
      fetch(url)
        .then(response => response.json())
        .then(response => {
          this.setState({results: response});
          console.log(response);
        })
        .catch(function(ex) {
          this.setState({results: []});
          console.log(ex);
        });
    }
  }

  render() {
    return (
      <div>
        <label><strong>Zip Code: </strong></label>
        <input type="text" value={this.state.zipcode} onChange={this.handleChange} />
        <CityList cities={this.state.results} />
      </div>
    );    
  }

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField />
      </div>
    );
  }
}

export default App;
