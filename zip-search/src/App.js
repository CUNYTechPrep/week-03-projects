import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




function City({city}) {
  const { City, State, Lat, EstimatedPopulation, TotalWages} = city;
  return (<div>
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{City}, {State}</h3>
      </div>
      <div className="panel-body">
        <ul>
          <li key='1'>State: {State}</li>
          <li key='2'>Location: ({Lat})</li>
          <li key='3'>Population (estimated): {EstimatedPopulation}</li>
          <li key='4'>Total Wages: {TotalWages}</li>
        </ul>
      </div>
    </div>
  </div>);
}

function ZipSearchField({ search }) {
  return (<div className='zipSearchField'>
    ZipCode: <input onChange={search} name='zipcode' type='number' />
  </div>);
}


class App extends Component {
  state = {
    cities: []
  };


  getCity = async (event) => {
    let zipcode, response, data, current_arr;
    zipcode = event.target.value;
    current_arr = this.state.cities;

    if (current_arr.some(x => x.Zipcode == zipcode)) {
      return;
    }

    try {
      response = fetch('http://ctp-zip-api.herokuapp.com/zip/' + zipcode);
    } catch (error) { }

    data = await response;

    if (typeof data.json == 'function') {
      data = await data.json();
      let arr = [...current_arr, ...data];
      this.setState({cities: arr});
    }

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className='box_centered'>
          <ZipSearchField search={this.getCity} />
          <div>
            {this.state.cities.map(city => <City city={city} />)}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
