import React, { Component } from 'react';
import './App.css';


const ZipCodesByState = function ({ data, city }) {
  let panels = [];
  for (let state in data) {
    let panel = <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">State: {state}</h3>
      </div>
      <div className="panel-body">
        <ul>
          {data[state].map( zip => <li key={zip}><strong>{city}</strong>, {zip} </li> )}
        </ul>
      </div>
    </div>;
    
    panels.push(panel);
  }
  return (<div>{panels}</div>);
};

const SearchField = function ({ search }) {
  return (<div className='citySearchField'>
    City Search: <input onChange={search} />
  </div>);
}



async function mapToState(json) {
  let data = {};
  for (let zip of json) {
    let state = await getState(zip);
    data[state] = data[state] || [];
    data[state].push(zip);
  }

  return data;
}

async function getState(zip) {
  let data, response;
  try {
    response = await fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip);
    data = await response.json();
  } catch (error) {
    return null;
  }

  return data[0].State;
}

class App extends Component {

  state = { data: {}, city: '' };

  search = (e) => {
    let city = e.target.value.toUpperCase();
    let that = this;
    fetch("http://ctp-zip-api.herokuapp.com/city/" + city).
      then(x => x.json()).
      then(mapToState).
      then(function (data) {
        that.setState({ data, city });
      }).
      catch(x => console.log(x))
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className='box_centered'>
          <SearchField search={this.search} />
          <ZipCodesByState data={this.state.data} city={this.state.city} />
        </div>
      </div>
    );
  }
}

export default App;
