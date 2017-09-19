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
     <li>Zip Code: {props.zip}</li>
   </ul>
    </div>

  </div>);
}

// function ZipSearchField(props) {
//   return (<div>
//     <label>Zip Code</label>
//     <input type='text' onChange={props.handleChange} value={props.value}/>
//   </div>);
// }

function CitySearchField(props)
{
  return (<div>
      <label> City Search </label>
      <input type='text' onChange={props.handleChange} value={props.value}/> 
    </div>
    )
}

class App extends Component {
  constructor()
  {
    super();
    this.state={
      zipCode: [],
      city : ""
    };
   // this.zipCodeChange = this.zipCodeChange.bind(this); 
   this.cityChange = this.cityChange.bind(this);
  }

  // zipCodeChange(event)
  // {
  //   const zip = event.target.value;

  //   if(zip.length === 5)
  //   {
  //     fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip)
  //     .then((response) =>{
  //       return response.json();
  //     })
  //     .then((jsonBody) => {
  //       console.log(jsonBody);

  //       const cityComps = jsonBody.map((city) => <City data ={city}/>)  //create punch of citis tag from the city array and pass entire city to the data
     
  //       this.setState(
  //       {
  //         cities: cityComps
  //       });
  //     })
  //   }

  //   this.setState(
  //   {
  //     zipCode: zip
  //   });

  // }

  cityChange(event)
  {
    const city = event.target.value;

    if(city.length >= 3)
    {
    fetch('http://ctp-zip-api.herokuapp.com/city/' + city)  //this return the string type
      .then((response) =>{
        return response.json();   // convert string to JSON
      })
      .then((jsonBody) => {     //jsonBody is array
        console.log(jsonBody);

        const zipComps = jsonBody.map((zip) => <City zip ={zip}/>)  //create punch of citis tag from the city array and pass entire city to the data
      
        this.setState(
        {
          zipCode: zipComps
        });
      })
    
    }
    this.setState(
    {
      city: city
    }); 
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField handleChange={this.cityChange} value ={this.state.cities}/>
        <div>
          {this.state.zipCode}
        </div>
      </div>
    );
  }
}

export default App;
