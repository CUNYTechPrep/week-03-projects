import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zip(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div className="panel-body"> 
              <div id="zipCodeBox">
                {props.data}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

function CitySearchField(props) {
  return (
      <div className="group-form text-center">
        <label><b>City Name:</b></label>
        <input type="text" id="citySearchBox" placeholder="Try SPRINGFIELD" onChange={props.handleChange} value={props.value} />
      </div>
    );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      cityName: "",
      zipCodes: []
    }
    this.cityCodeChanges = this.cityCodeChanges.bind(this);
  }

  cityCodeChanges(event) {
    const city = event.target.value.toUpperCase();

    this.setState({
      city: city
    });
  
      fetch("http://ctp-zip-api.herokuapp.com/city/" + city)
        .then((response) => {
          return response.json();
        }).then((jsonBody) => {
          const zipCodes = jsonBody.map((data) => <Zip data={data} />);

          this.setState({
            zipCodes: zipCodes
          });
        }).catch((err) => {

        });


        this.setState({
          cityName: city
        });
    
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Name Search</h2>
        </div>
        <CitySearchField handleChange={this.cityCodeChanges} value={this.state.cityName} />
        <div>
          {this.state.zipCodes}
        </div>
      </div>
    );
  }
}

export default App;

