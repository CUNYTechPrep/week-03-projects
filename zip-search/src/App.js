import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (<div></div>);
  <div className="panel panel-default">
    <div className="panel-heading"> 
      {props.data.City}
    </div>
    <div className="panel-body">
      Info about City
    </div>
  </div>
}

function zipAdded(event){
    console.log("helloooooooooooooo");
}

function ZipSearchField(props) {
  return (
    <div className="row text-center">  
      <label> Zipcode: </label>
      <input type="text" value={props.value} onChange={props.handleChange}/>
    </div>
  );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: "",
      cities: []
    };
    // this is done because e6 does the weird thing with the this so must include the bind at the end of constructor
    this.zipChanged = this.zipChanged.bind(this);
  }
  zipChanged(event){
    const zip = event.target.value;
    this.setState({
      zipCode: zip
    });

    //fetch time only if you have the 5 numbers. the fetch returns a promise(IOU); you have to send it back so that it works 
    if (zip.length === 5){
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip)
      // this is going to return the json data. RN should be checking the status code
        .then((response) => {
          // decode json and when its decode its going to send back the json data
          return response.json();
        })
        .then((jsonData) => {
          //console.log(jsonData);
          // map looks at elements in an array it transforms it
          const cities = jsonData.map((obj) => <City data={obj} />);
          // dont call it all the time prepare it first then call set state
          this.setState({
            cities: cities
          })
        });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField value={this.state.zipCode} handleChange={this.zipChanged}/>
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
