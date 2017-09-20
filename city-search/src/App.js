import React, { Component } from 'react';
import './App.css';


function Zipcode(props) {
  return (
    <div className="text-center">
      zip: {props.data}
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="row">
      <div className="text-center">
        <input type="text" placeholder="City" className="text-center" onChange={props.handleChange} />
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      zipcode: "",
      cities: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    let city = evt.target.value;
    this.setState({
      cities: city
    });
    if (typeof(city) === "string") {
      let link = "http://ctp-zip-api.herokuapp.com/city/" + city;
      fetch(link).then((response) => {
        return response.json();
      }).then((json) => {
        const zipComps = json.map((zipcode) => {return <Zipcode data={zipcode} />;});
        this.setState({
          zipcode: zipComps
        });
      });
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Code Search</h2>
        </div>
        <CitySearchField handleChange={this.handleChange} />
        <div>
          {this.state.zipcode}
        </div>
      </div>
    );
  }
}

export default App;