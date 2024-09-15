import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


function City(props) {

  return (
    <div className="panel panel-default">
      <h3 className="panel-heading">{props.cityData.City}</h3>
        <ul className="panel-body">
          <li>State: {props.cityData.State}</li>
          <li>Location: ({props.cityData.Lat},{props.cityData.Long})</li>
          <li>Population (estimated): {props.cityData.EstimatedPopulation}</li>
          <li>Total Wages: {props.cityData.TotalWages}</li>
        </ul>    
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12">
        Zip Code:
        <input value ={props.zipcode} onChange={props.zipChange} placeholder="Try 10016"></input>
      </div>
    </div>
  );
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      zipcode: '',
      data: [<div>No Result</div>]
    };

    this.updateZip = this.updateZip.bind(this);
  }

  updateZip(evt){

    let zip = evt.target.value;
    this.setState({
      zipcode: zip
    })
    console.log(this.state.zipcode);
    
    if(zip.length === 5){
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip)
        .then((resp) => {
          if(resp.ok){
            return resp.json();
          }else{
            return [];
          }
        }).then((respJson) => {
          const cities = respJson.map(d => {
            return <City cityData={d} />
          })

          this.setState({
            data: cities
          })
        })
    }else{
      this.setState({
        data: [<div>No Result</div>]
      })
    }
  }


  render() {
    console.log(this.state.data);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6">
              <ZipSearchField 
                zip={this.state.zipcode} 
                zipChange = {this.updateZip}
              />
                {this.state.data}
            </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
