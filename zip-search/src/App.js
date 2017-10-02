import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div>
    	<h3> {props.data.LocationText} </h3>
    	<ul>
    		<li>State: {props.data.State}</li>
    		<li>Location: ({props.data.Lat}, {props.data.Long})</li>
    		<li>Population: {props.data.EstimatedPopulation}</li>
    		<li>Total Wages: {props.data.TotalWages}</li>
    	</ul>

    </div>);
}

function ZipSearchField(props) {
  return (
    <div>
      <form>
        <label htmlFor ="zip">
          Zip Code:
        </label>
      <input type="text" id="zip"  className="form-control" value={props.zipcode} onChange={props.handleChange} />
      </form> 
    </div>);
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      zipcode: "",
      cities: [],

    }

    this.zipcodeChanged = this.zipcodeChanged.bind(this);
  }

  zipcodeChanged(event){
    const zip = event.target.value;

    this.setState({
      zipcode: zip,
    });

    if (zip.length === 5) {
    	fetch('https://ctp-zip-api.herokuapp.com/zip/'+zip)
    	.then((response)=>{
    		return response.json();
    	}).then((jsonObj)=> {
    		const citylist = jsonObj.map((city)=> <City data={city}/>);
    		this.setState({
    			cities:citylist
    		});
    	})
    }

}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField 
        zipcode = {this.state.zipcode}
        handleChange = {this.zipcodeChanged} />
        {this.state.cities.length > 0 ? this.state.cities : <div>No Results</div>}
        <div>
        </div>
      </div>
    );
  }
}

export default App;
