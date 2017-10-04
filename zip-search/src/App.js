import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (<div className='panel panel-default'>
    <div className='panel-heading'>
    {props.data.City}
    </div>

    <div className='panel-body'>
   <ul>
   <li>City: {props.data.City}</li>
   </ul>
    </div>

  </div>);
}

function ZipSearchField(props) {
  return (<div>
    <label>Zip Code</label>
    <input type='text' onChange={props.handleChange} value={props.value}/>
  </div>);
}


class App extends Component {
  constructor()
  {
    super();
    this.state={
      cityname:"",
      zipCode: "",
      cities : []
    };
    this.zipCodeChange = this.zipCodeChange.bind(this); 
  }

  zipCodeChange(event)
  {
    
    const zip = event.target.value;

    if(zip.length === 5)
    {
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip)
      .then((response) =>{
        return response.json();
      })
      .then((jsonBody) => {
        console.log(jsonBody);

        const cityComps = jsonBody.map((city) => <City data ={city}/>)  //create punch of citis tag from the city array and pass entire city to the data
     
        this.setState(
        {
          cities: cityComps
        });
      })
    }

    this.setState(
    {
      zipCode: zip
    });

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={this.zipCodeChange} value={this.state.zipCode}/>

        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
