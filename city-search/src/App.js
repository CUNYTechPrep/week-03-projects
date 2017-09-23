import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function SearchResults(props) {
  let results;
  if (props.results === null) {
    results = <p>No Results Found</p>
  } else {
    results = props.resultMap(props.results);
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

function ZipAndCity(zipandcity) {
  let {zip, city} = zipandcity;
  return (
    <li>{zip}: {city}</li>
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
    const { onEnter, ...otherProps } = this.props;
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
    console.log("Entering Show Results:");
    let city = document.querySelector('input').value;
    let results = getResults(city);
    //console.log("Search Field Results:", results);
    results.then( result => {
      console.log("Show Results result:", result);
      props.showResults(result);
    });
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


/*
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
*/

function getResults(city) {
  let url = "http://ctp-zip-api.herokuapp.com";
  console.log(city.toUpperCase());
  return (
    fetch(`${url}/city/${city.toUpperCase()}`)
      .then(response => {
        console.log("Got the zips for the city.");
        console.log("Response:", response);
        if (response.ok) {
          let json = response.json();
          console.log("JSON:", json);
          // Be careful! The return value of response.json() is, itself,
          // a promise! Just because the response was resolved at this
          // point doesn't mean that fetching the json is synchronous.
          return json;
        } else {
          return null;
        }
      })
      .then(zips => {
        let zipFetches = zips.map( zip => {
          return fetch(`${url}/zip/${zip}`);
        })
        return Promise.all(zipFetches);
      })
      .then(allFetches => {
        console.log("allFetches", allFetches);
        console.log(allFetches.prototype || allFetches.__proto__);
        let fullResponse = allFetches.map( response => response.json() );
        return Promise.all(fullResponse);
      }).then(allResponses => {
        console.log(allResponses);
        console.log(allResponses.prototype || allResponses.__proto__);
        let flattenedResponses = allResponses.reduce( (flat, sublist) => {
          return flat.concat(sublist);
        }, []);
        let groups = groupBy(flattenedResponses, 'State');
        console.log("Groups:", groups);
        return groups;
      }).catch(error => {
        console.log("An error occured:", error);
        return null;
      })
  );
}

/* function groupBy(list, field)
 * Parameters
 * list : Array
 *    An array of objects. All of the objects should contain the given
 *    field.
 * field : string
 *    A key into the objects.
 * Returns
 *    An object whose keys are all the values of 'field' as found in the
 *    objects in list, and whose values are lists of objects which
 *    shared the same value for 'field'.
 */
function groupBy(list, field) {
  return list.reduce( (groups, record) => {
    if (groups[record[field]] === undefined) {
      groups[record[field]] = [];
    }
    //console.log("Record:", record)
    //console.log("Field:", record[field])
    //console.log("Keys:", Object.getOwnPropertyNames(record));
    groups[record[field]].push(record);
    return groups;
  }, {})

}

function State(props) {
  let zips = props.zips.map(ZipAndCity);
  return (
    <div key={props.key} className="result">
      <div className="result-header">
        {props.State}
      </div>
      <div className="result-body">
        <ul>
          {zips}
        </ul>
      </div>
    </div>
  );
}

function StateGroup(states) {
  console.log("states:", states);
  return (
    Object.keys(states).map( state => {
      return <State 
                key={state} 
                State={state} 
                zips={states[state].map(record => {
                  return {zip:record.Zipcode, city:record.City};
                })}/>
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
    console.log("Results from App:", results);
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
            resultMap={StateGroup}
            />
        </div>
      </div>
    );
  }
}

export default App;
