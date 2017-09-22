import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
  	//{/*Note: review panels attribute values*/}
  	  <div className="row">
  	    <div className="col-xs-12">
  	      <div className="panel panel-default">
  	        <div className="panel-heading">
  	          <h3 className="panel-title">{props.data.LocationText}</h3>
  	        </div>
  	        <div className="panel-body">
  	          <ul>
  	            <li>State: {props.data.State}</li>
  	            <li>Location: ({props.data.Lat}, {props.data.Long}) </li>
  	            <li>Population (estimated): {props.data.EstimatedPopulation}</li>
  	            <li>Total Wages: {props.data.TotalWages}</li>
  	          </ul>
  	        </div> 
  	      </div>   
  	    </div> 
  	  </div>
  	);
}

function ZipSearchField(props) {
	 return (
	     <div className = "row">
	       <div className = "col-lg-12 form-inline">
	         <label htmlFor="zip">Zip Code: </label>
	         <input type="text" id="zip" className="form-control"
	         value={props.zipCode} onChange={props.handleChange}
	         placeholder={"Try 10016"} />
	      </div>
	     </div>);
}

class App extends Component {
  constructor() {
  	super();
  	this.state = {
  		citySearch: '',
  		cityNames: [],
  		zipCode: "",
  	};

 	this.handleChange= this.handleChange.bind(this);
  } // end of constructor for the parent class called App

  handleChange(evt){
  	const zip = evt.target.value;

  	this.setState({
  		zipCode: zip,
  	})

  	if(zip.length === 5) {
  		//for the state, it's in all capitals
  		fetch('http://ctp-zip-api.herokuapp.com/zip/'+zip)
  		  .then((response) => {
  		  	if(response.ok) { // If the response.ok case is true, then
  		  		// we will return a json.response
  		  		return response.json();
  		  	} else { // In the else case, we return an empty array
  		  		return [];
  		    }
  		  }) // For the higher order function called .then, we 
  		  // check if the response is okay.

  		  .then((jsonResponse) => {
  		  	const infoForCities = jsonResponse.map((city) => {
  		  	  return <City 
  		  	    data={city} key={city.RecordNumber} />;
  		    }); /* end of map higher order function 
  		    where we map the city object 
			and the recordNumber.	*/

  		  this.setState({
  		  	cityNames: infoForCities,
  		  });
  		}) // When the jsonResponse isn't correct, then we catch 
  		  // an exception:
  		  .catch((e) => {
  		  	this.setState({
  		  	  cities: [],
  		    });
  		    console.log("In catch: " + e);
  		  });
  		} // end if statement
  		else{
  			  this.setState({
  				cityNames: [],
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
                handleChange={this.handleChange}  />
              {this.state.cityNames.length > 0 ? this.state.cityNames : <div>No Results</div>}
            </div>
          </div>
        </div>
      </div> // end divider with className=App
    );
  }
}

export default App;