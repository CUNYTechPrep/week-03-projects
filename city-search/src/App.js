import React, { Component } from 'react';
import './App.css';

function Zip(props) {

  return (
    <div className="panel panel-default">
      <p>{props.zipData}</p>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12">
        City:
        <input value ={props.cityVal} onChange={props.cityChange}></input>
      </div>
    </div>
  );
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      data: [<div>No Result</div>]
    };

    this.updateCity = this.updateCity.bind(this);
  }

  updateCity(evt){

    let currentCity = evt.target.value;
    this.setState({
      city: currentCity
    })
    
    fetch('http://ctp-zip-api.herokuapp.com/city/' + currentCity)
      .then((resp) => {
        if(resp.ok){
          return resp.json();
        }else{
          return [];
        }
      }).then((respJson) => {
        const zip = respJson.map(d => {
          return <Zip zipData={d} />
        })

        this.setState({
          data: zip
        })
      })
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
              <CitySearchField 
                cityVal={this.state.city} 
                cityChange = {this.updateCity}
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