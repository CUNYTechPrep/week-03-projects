import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  return (
    <div>data{props.data}</div>/*
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{props.data.LocationText}</h3>
          </div>
          <div className="panel-body">
            <ul>
              <li>State: {props.data.State}</li>
              <li>Location: ({props.data.Lat}, {props.data.Long})</li>
              <li>Population (estimated): {props.data.EstimatedPopulation}</li>
              <li>Total Wages: {props.data.TotalWages}</li>
              {}
            </ul>
          </div>
        </div>
      </div>
    </div>
    */
  );
}

function SearchField(props){

  return (<div> 
    <form>
    <label>
      Zip Code:
      <input type="text" value = {props.value} onChange = {props.handleChange} placeholder="Try 10016" />
    </label>
    <input type = "submit" value = "Submit" />
    <p>You entered: {props.value}</p>
  </form>
    

  </div>);

}

class App extends Component {
  constructor(){
    super();
    this.state = {
      value: "",
      cities: [],
    }
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const zip = event.target.value;
    this.setState({value: zip,});
    console.log("value: " + this.state.value);
    //event.preventDefault();

    console.log(this);
    //only fetch url if valid length for zip code
    if(zip.length === 5) {
      fetch("http://ctp-zip-api.herokuapp.com/zip/"+zip)
        .then((response) => {
          if(response.ok)
            return response.json();
          else
            return [];
          })
          .then((json) => {
            console.log("parsed json", json);
            const cities = json.map((city) => {
              return <City data={city} key={city.RecordNumber} />;
            });
            //console.log("created cityStuff");
            //console.log(cities.City);
            //console.log(cityStuff);
            //console.log(cities);
            this.setState({cities: cities});
            console.log("set state");
            //console.log(this.state.cities.City);

          })
            .catch((ex) => {
            console.log("error parsing");
            console.log(ex);
            this.setState({
              cities: [],
            });
            
          });
          //console.log(this.state.cities);
      }
      else {
        console.log("zip length must be 5");
        this.setState({
          cities: [],
        });
        //console.log(this.state.cities);
}

  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Zip Code Search</h1>
        </div>
        <div>
        <SearchField handleChange = {this.handleChange} value = {this.state.value} /*handleSubmit = {this.handleSubmit}*//>
          {this.state.cities.length > 0 ? this.state.cities : <div>No Results</div>}
        </div>

      </div>
    );
  }
}

export default App;
