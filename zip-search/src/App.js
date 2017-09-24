import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

function getCity(zipCode){
  return fetch(`http://ctp-zip-api.herokuapp.com/zip/${zipCode}`)
  .then(response => response.json());
}

// This functional component renders the HTML structure that
// accepts the zipcode input from the user
function ZipSearchField(props) {
  return (
  <div className="row center">
    <form>
      <label>Zip Code: </label>
      <input type="text" maxLength="5" onChange={props.onChange}/>
    </form>
  </div>);
}

// This functional component creates the HTML structures based on the
// array of JSON objects passed to its `props.result` property
function City(props) {
  const result = props.result;
  return (
    <div className="row center">

      {result.map((city, index) => {
        return (
          <div key={index} className="panel panel-default text-left">
            <div className="panel-heading"><span className="text-capitalize">{city.City.toLowerCase()}</span>, {city.State} </div>
            <div className="panel-body">
              <ul>
                <li>State: {city.State}</li>
                <li>Location: ({city.Lat}, {city.Long})</li>
                <li>Population (estimated): {city.EstimatedPopulation}</li>
                <li>Total Wages: {city.TotalWages}</li>
              </ul>
            </div>
          </div>
        );
        })
      }

    </div>
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      locations: [],
    };
  }

  // This event handler checks if the input entered to the input field passes the simple validation test
  // and if so, execute the async method to fetch the data from the server with the validated zipcode 
  // entered. The fetched data is then set to the `locations` state of the component to trigger re-render
  handleZipChange = (event) => {
    let input = event.target.value;
    if (parseInt(input, 10).toString().length === 5){
      getCity(input)
      .then(response => {
        this.setState({locations : response});
      })
      .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>

        <ZipSearchField onChange={this.handleZipChange}/>

        <div className="text-center">
          <City result={this.state.locations}/>
        </div>
      </div>
    );
  }
}

export default App;
