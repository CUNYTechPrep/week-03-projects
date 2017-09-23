import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {props.data.City}
      </div>
      <div className="panel-body">
        <ul>
          <li>Estimated Population: {props.data.EstimatedPopulation}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="center-block">
      <form>
        <label>
          Zip Code:
          <input type="text" placeholder="Zip Code" onChange={props.handleChange} value={props.value}/>
        </label>
      </form>
    </div>
  );
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      zipCode: '',
      cities: []
    }
    this.zipCodeChanged = this.zipCodeChanged.bind(this)
  }

  zipCodeChanged(event) {
    const zip = event.target.value;

    if(zip.length === 5) {
      console.log(zip)
      console.log(typeof(zip))
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip)
        .then((response) => {
          return response.json();
        }).then((jsonBody) => {

          const cityComps = jsonBody.map((city) => <City data={city} />)
          console.log("cityComps",cityComps)
          this.setState({
            cities: cityComps
          })

        })
    }

    console.log("this.state.cities", this.state.cities)


    this.setState({
      zipCode: zip
    })

    console.log("this.state.cities", this.state.cities)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Code Search</h2>
        </div>
        <ZipSearchField value={this.state.zipCode} handleChange={this.zipCodeChanged}/>
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
