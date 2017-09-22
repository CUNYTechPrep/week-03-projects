import React, { Component } from 'react';
import './App.css';

function ZipCode(props) {
  return (
    //{/*Note: review panels attribute values*/}
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-body">
            <ul>
              <span>{props.data}</span>
            </ul>
          </div> 
        </div>   
      </div>
    </div>
  );
}


function CitySearchField(props) {
return (
  
    <div className="row">
      <div className="col-xs-12form-inline">
        <label htmlFor="city">Enter City: </label>
        <input type = "text" id="cityInput" className="form-control"
        value={props.CityName} onChange={props.handleChange}
        placeholder={"Try SpringField"} />
      </div>
    </div>
  ); 
}

class App extends Component {
    constructor() {
      super(); // call component constructor
      this.state={
        zipCodes: [], 
        cityName: "",
      };

      //bind event handler
      this.handleChange = this.handleChange.bind(this);
    }
      
    //The evt argument stands for event
    handleChange(evt){
      const inputForCity = evt.target.value.toUpperCase();

      this.setState({
        cityName: inputForCity,
      }); 

      //The state cityName is in all capitals
      fetch('http://ctp-zip-api.herokuapp.com/city/'+inputForCity)
        .then((response) => {
          if(response.ok){// If response okay, then we return response.json()
            return response.json();
          } else{ // In the else case, we return an empty array
            return [];
          }
        })
        .then((jsonResponse) => {
          //infoForZipCodes is an array:
          const infoForZipCodes= jsonResponse.map((zipCode) => {
            return <ZipCode data={zipCode} />;
          }); // end of map higher order function where we return the ZipCode component,
          // which is set equal to the infoForZipCodes

          this.setState({
            zipCodes: infoForZipCodes,
          });

        })// end of then higher order function
        .catch((exception) => {
          this.setState({
            zipCodes: [],
          });
          console.log("Error caught: " + exception);
        }); //end of fetch pipeline functions(I think it's similar to lambda expressions)
     
      
    }


          

        
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-sm-3">
              <CitySearchField
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
