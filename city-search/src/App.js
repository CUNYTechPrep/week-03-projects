import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCode(props) {
  return (             //
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{"hie"}</h3>
          </div>
          <div className="panel-body">
            <ul>
              <li>ZipCode: {props.data}</li>
              
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchField(props) {
return (
  
    <div className="row">
      <div className="col-xs-12form-inline">
        <label htmlFor="city">Enter City: </label>
        <input type = "text" id="cityInput" className="form-control"
        value={props.CityName} onChange={props.handleChange}
        placeholder={"Enter a city!" } />
      </div>
    </div>
  ); 
}

class App extends Component {
    constructor() {
      super(); 
      this.state={
        cityName: "",
        zipCodes: [], 
        
      };

      //bind event handler
      this.handleChange = this.handleChange.bind(this);
    }
      
    
    handleChange(evt){
      const inputForCity = evt.target.value.toUpperCase();

      this.setState({
        cityName: inputForCity,
      }); 
      console.log(inputForCity)

    
      fetch('http://ctp-zip-api.herokuapp.com/city/'+inputForCity)
        .then((response) => {
          if(response.ok){

            return response.json();
            
          } else{ 
            return [];
          }
        })
        .then((jsonResponse) => {
          //infoForZipCodes is an array:
          const infoForZipCodes= jsonResponse.map((zipCode) => {
            return <ZipCode data={zipCode} />;

          }); 

          this.setState({
            zipCodes: infoForZipCodes,

          });
          

        })
        .catch((exception) => {
          this.setState({
            zipCodes: [],
            cityName: ""
          });
          console.log("Error caught: " + exception);
        }); 
     
      
    }


          

        
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <SearchField
                cityName={this.state.CityName}
                handleChange={this.handleChange}  />
              {this.state.zipCodes.length > 0 ? this.state.zipCodes : <div>No Results</div>}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
