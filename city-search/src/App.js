import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCode(props) {
  return (
    <div className="row">
      <div className="panel-body">
        <ul>
          <li>Zip: {props.data}</li>
        </ul>
      </div>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12 form-inline">
        <label htmlFor="zip">Zip Code: </label>
          <input
            type="text"
            onChange={props.handleChange}
            placeholder="Try Boston" />
      </div>
    </div>
  );
}

class App extends Component {
    constructor() {
    super();
    this.state = {
      zipValue: [],
      cities: "",
    }

    // Don't forget to bind the event handler
    this.cityValueChanged = this.cityValueChanged.bind(this);
  }

  cityValueChanged(event) {
    const city = event.target.value;
    this.setState({
      cities: city,
    });

    fetch('http://ctp-zip-api.herokuapp.com/city/'+city.toUpperCase())
      .then((response) => {
        if(response.ok) {
            return response.json();
          } 
          else {
            return [];
          }
        })

        .then((jsonResponse) => {
          const zips = jsonResponse.map((z) => {
            console.log(z);
            return <ZipCode data={z} />;

          });
           this.setState({
              zipValue: zips,
            });

        })

        .catch(function(error) { console.log(error); });

  }


  render() {
    return (      
      <div className="App">
        <div className="App-header">
          <h2>City Code Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <CitySearchField 
                handleChange={this.cityValueChanged} />
              <div>
                 {/* why do  i need this inorder to work? */this.state.zipValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
