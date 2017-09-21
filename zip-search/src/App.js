import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="results">
      <div className="panel panel-default">
        <div className="panel-heading">
          {props.data.LocationText}
        </div>
        <div className="panel-body">
          <ul>
            <li>State: {props.data.State}</li>
            <li>Location: ({props.data.Lat}, {props.data.Long})</li>
            <li>Population (estimated): {props.data.EstimatedPopulation}</li>
            <li>Total Wages: {props.data.TotalWages}</li>
          </ul>
        </div>
      </div>
    </div>);
}

function ZipSearchField(props) {
  return (
    <div className="search">
      <form className="form-inline">
        <label className="form-control-static">Zip Code:</label>
        <input className="form-control" type="text" placeholder="Try 10016" onChange={props.handleClick} />
      </form>
    </div>);
}


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      zipCode: "",
      cities: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    let zip = i.target.value;
    this.setState({
      zipCode: zip
    });

    if (zip.length == 5) {
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip).then((response) => {
        return response.json();
      }).then((json) => {
        const cityComps = json.map((city) => {return <City data={city} />;});
        this.setState({
          cities: cityComps
        });
      });
    }
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleClick={this.handleClick} />
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
