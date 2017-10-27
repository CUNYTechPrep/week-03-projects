import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) { //this defines the design of the panel which will hold the search results
  return (             //
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{props.data.LocationText}</h3>
          </div>
          <div className="panel-body">
            <ul>
              <li> State: {props.data.State} </li>
              <li> Location: ({props.data.Lat},{props.data.Long}) </li>
              <li> Population (estimated): {props.data.EstimatedPopulation} </li>
              <li> Total Wages: {props.data.TotalWages}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="row">
      <div className="col-lg-12 form-inline">
        <label htmlFor="zip"> Zip Code: </label>
        <input type="text" id="zip" className="form-control"
        value= {props.zipCode} onChange={props.zipChanged}
        placeholder={"Enter a zipcode!" } />
      </div>
    </div>
    );
}


class App extends Component {
  constructor(){
    super(); //gota be there 
    this.state= { //empty state 
      zipcode: "",
      cities: []
    };
    this.zipChanged = this.zipChanged.bind(this); //has to bind ZipChanged method to whole class  
  }

  zipChanged(event){
    const zip = event.target.value;

    this.setState({
      zipcode: event.target.value
    });

    if(zip.length === 5){
      fetch("http://ctp-zip-api.herokuapp.com/zip/"+zip)
        .then((response) => {
          return response.json();
        }
        )
        .then((jsonData)=>{
          console.log(jsonData);
            const cities= jsonData.map((obj) => <City data= {obj} />);
            this.setState({
              cities:cities
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <ZipSearchField
                zipCode={this.state.zipCode}
                zipChanged={this.zipChanged} />
              {this.state.cities}
            </div>
          </div>
        </div>
      </div>

        
        

    );
  }
}

export default App;
