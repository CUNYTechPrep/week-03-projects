import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


function City(props) {
  // http://ctp-zip-api.herokuapp.com/zip/10016
  const url = 'http://ctp-zip-api.herokuapp.com/zip/';
  const zip = "10016";
  const cities = [];
  //let result;


  // GET json
  fetch(url+zip)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log('has', json.length, 'results');


    json.forEach((data) => {
      //cities.push(data);
      console.log(data);
      cities.push(
        <table>
          <tr>
            <th>{data.City}, {data.State}</th> 
          </tr>
          <tr>
            <td>
              <ul>
                <li>State: {data.State}</li>
                <li>Location: ({data.Lat}, {data.Long})</li>
                <li>Population(estimated): {data.EstimatedPopulation}</li>
                <li>Total Wages: {data.TotalWages}</li>
              </ul>
            </td>
          </tr>
        </table>
      );
    });



    //cities.forEach(city => {});
    //console.log('parsed json', json);
    return (<div>{cities[0]}</div>);
  
  })
  .catch((ex) => {
    console.log('parsing failed', ex);

    // if no results are found...
    console.log('No Results');
  });

  //cities.forEach((city) => {console.log(city)} );
  //cities.forEach((cityData) => {<div>{cityData}</div>})

  return (<div>{cities}</div>);
}

function ZipSearchField(props) {
  return (
    <div>
      <form>
        <strong>Zip Code:</strong>
        <input 
          type='text'
          placeholder='Try 10016' 
        />
      </form>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="App-body">
          <ZipSearchField />
          <City value='No Result'/>
        </div>
      </div>
    );
  }
}

export default App;
