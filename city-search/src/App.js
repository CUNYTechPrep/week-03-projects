import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  return (<div className='panel panel-default'>
    <div className='panel-heading'>
    {props.value.City}
    </div>
    <div className='panel-body'>
     <ul className='list-unstyled'>
       <li>Zip Code: {props.value}</li>  
     </ul>
    </div>
  </div>);
}

function CitySearchField(props)
{
  return (<div className='container'>
    <div className='row'>
      <div className='col-md-2 col-md-offset-2'>
         <label> City Search </label>
      </div>

      <div className='col-md-4'>
            <div className='input-group'>
                <input type='text' className='form-control col-xs-4' placeholder='Input City Name' onChange={props.handleChange} value={props.value}/> 
                <span className='input-group-btn'>
                  <button type='button' className='btn btn-default'>Search</button>
                </span>
            </div>
       </div>
       </div>
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
   this.cityChange = this.cityChange.bind(this);
  }
 
  cityChange(event)
  {
    const city = event.target.value;

    if(city.length >= 3)
    {
      fetch('http://ctp-zip-api.herokuapp.com/city/' + city.toUpperCase())  //this return the string type
      .then((response) =>{
        return response.json();   // convert string to JSON
      })
      .then((jsonBody) => {     //jsonBody is array
        console.log(jsonBody);

        const zipComps = jsonBody.map((zip) => <City key={zip} value={zip} />)  //create punch of citis tag from the city array and pass entire city to the data

        this.setState(
        {
          zipCode: zipComps,
        }); 
      })

      .catch((error) => {
          console.log("No Input");
      });
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
        <CitySearchField handleChange={this.cityChange} value={this.state.city}/>
        <div>
          {this.state.zipCode}
        </div>
      </div>
    );
  }
}

export default App;
