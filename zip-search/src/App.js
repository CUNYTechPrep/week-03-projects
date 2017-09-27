import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
 
  return ( 
  <div>
    <div className = " well row panel panel-default col-md-6 col-md-offset-3">
      <div className = "panel-heading">
       {props.data.City}
      </div>

      <div className= "panel-body">
     
      <ul>
        <li>City: {props.data.City}</li>
        <li>Est. Population: {props.data.EstimatedPopulation}</li>
        <li>State: {props.data.State}</li>
        <li>Country: {props.data.Country}</li>
        <li>Location: {props.data.LocationText}(Lat {props.data.Lat}, Long {props.data.Long})</li>
      </ul>
     
      </div>
  </div>
  </div>
  );
}

function ZipSearchField(props) {
  return (
  <div>
    <div className = "col-md-6 col-md-offset-5">
    <label color = "lightblue">
        Zip Code:
    </label>
     
    <input type = "text" onChange = {props.handleChange} className = "panel panel-default"/>
    </div>
  </div>);
}


class App extends Component {
 
  constructor()
  {
    super(); 
    this.state ={State: [],City:[],zipCode : ""};

    this.zipCodeChange = this.zipCodeChange.bind(this);
  }

  zipCodeChange(event)
  {
      const zip = event.target.value;

      if(zip.length === 5)
      {
        fetch('http://ctp-zip-api.herokuapp.com/zip/'+zip)
        
        .then((response)=>{
          return response.json();
        }

        ).then((jsonBody)=> {
          console.log(jsonBody);
          
          const cityComps = jsonBody.map((city)=><City data={city}/>);

          this.setState({
            City: cityComps
          });
        })

      }

      this.setState({
        zipCode : zip        
      });
  }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange = {this.zipCodeChange} value= {this.state.zipCode}/>
        <div>
          {this.state.City}
        </div>
      </div>
    );
  }
}

export default App;
