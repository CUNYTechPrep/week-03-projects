import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function getCity(zipCode){
  return fetch(`http://ctp-zip-api.herokuapp.com/zip/${zipCode}`)
  .then(response => response.json());
}

/**
 * This function creates the HTML structure of the resulting zip code query 
 * @param {*} props 
 */
function City(props) {
  const result = props.result;
  return (
    <div>

      {result.map((city, index) => {
        return (
          <ul key={index}>
            <ol>City: {city.City}</ol>
            <ol>State: ({city.Lat}, {city.Long})</ol>
            <ol>State: {city.State}</ol>
            <ol>Population (estimated): {city.EstimatedPopulation}</ol>
            <ol>Total Wages: {city.TotalWages}</ol>
          </ul>
        );
        })
      };

    </div>
  );
}

/**
 * This function renders the Zip Search field where user can enter a valid zipcode
 * @param {*} props Takes in a list of props from the parent component
 * @todo Add the necessary body for the code to work 
 */
function ZipSearchField(props) {
  // const zipCode = this.props.zipCode;
  return (
  <div>
    Zip Code: <input type="text"/>
  </div>);
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      zipCode: "11377",
      locations: [],
    };
  }

  // This life-cycle hook handles the logic of pulling data from the server
  componentDidMount(){
    if (this.state.zipCode.length !== 0){
      getCity(this.state.zipCode)
      .then(response => {
        this.setState({locations : response})
      })
      // .then( _ => console.log(this.state.locations))
      .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField  />
        <div>
          <City result={this.state.locations} />
        </div>
      </div>
    );
  }
}

export default App;
