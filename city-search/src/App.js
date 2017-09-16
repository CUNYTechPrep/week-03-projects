/*jshint 'esversion: 6' */

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function State(props) {
  let codes = props.codes.map((codeObj) => {
    let key = Object.keys(codeObj);
    let city = codeObj[key].City;
    return <li>Code: {key} --- City: {city}</li>
  });
  let style = {
    'fontWeight': 'bold'
  }
  return (
    <div className="col-lg-4 col-md-4 col-sm-4 panel panel-default text-center">
      <div style={style} className="panel-heading">State: {props.name}
      </div>
      <div className="panel-body ">
        <ul>
          {codes}
        </ul>
      </div>
    </div>

  );
}

function CitySearchField(props) {
    return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center" style={{
          'marginTop': '20px',
          'marginBottom': '20px'
        }}>
          <label>Enter City:
          </label>
          <input id="cityInput" onChange= {props.changeHandler} type="text"
                placeholder="search term..." pattern="[A-Za-z]" value={props.value}/>
          <input type="button" className="btn btn-secondary" onClick={props.clickHandler} value='Search'/>
        </div>
      </div>
    </div>
  );
}

function Manager(props){
    const states = Object.keys(props.states).map(state =>{
      return <State name={state} codes={props.states[state]}/>
    });

    return(
      <div>{states}</div>
    );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      cityName: '',
      codes: [],
      cityStates: {},
    };
    this.submitClicked = this.submitClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getStates = this.getStates.bind(this);
  }

  getStates(codes){
    console.log(codes.length);
    let url = 'http://ctp-zip-api.herokuapp.com/zip/';
    let states = {};

    var p = Promise.all(codes.map(code =>
      fetch(url+ code).then(response =>{
        return response.json();
      }).then(jsonResponse => {
        let city = jsonResponse[0];
        let st = city.State;
        let codeObj = {};
        codeObj[code] = city;
        if (st in states) {
          let added = false;
          states[st].forEach(codeObj => {
            let key = Object.keys(codeObj);
            city.Name == codeObj[key].Name
              ? added = true
              : {};
          });
          added
            ? {}
            : states[st].push(codeObj);
        } else {
          let arr = [];
          arr.push(codeObj);
          states[st] = arr;
        }
      })
    ));
    p.then(() => {
      this.setState({cityStates:states, codes:codes});
    });
  }

  submitClicked(evt) {
    let cityName = document.querySelector("#cityInput").value;
    fetch('http://ctp-zip-api.herokuapp.com/city/' + cityName.toUpperCase()).then(response => {
      return response.json();  //Array of Zip Codes
    }).then(this.getStates).catch(err => {
        console.log(err);
        this.setState({codes: [], cityStates: []});
      });
  }

  handleChange(evt){
    let city = evt.target.value;
    this.setState({cityName: city});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField clickHandler={this.submitClicked}
            changeHandler={this.handleChange} value={this.state.cityName}/>
        <div className="container">
          <div className="row center-content">
            {(this.state.codes != 0)
              ? <Manager states={this.state.cityStates} />
              : <div className="col-lg-4 col-lg-offset-4 text-center" style={{
                'marginTop': '20px'
              }}>
                <strong>No Results</strong>
              </div>
}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
