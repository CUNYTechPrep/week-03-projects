import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zip(props){

  return(

    <div className= "panel panel-default">

      <div className= "panel-heading"> 
      {props.data.Zip}
      </div>

      <div className= "panel-body"> 


      {props.data.City}
      </div>

    </div>

    )
}

function CitySearchField(props){

  return(<div>
    <label> City Name: </label>
     <input type ="text" className="form-control" onChange={props.handleChange} value ={props.value}/>
    </div>);

}

class App extends Component {
  constructor(){
    super();
    this.state ={

      cityName: "",
      zipCode:[<Zip/>]
    };

    this.cityNameChanged = this.cityNameChanged.bind(this);
  }
  cityNameChanged(event){

    const cityname = event.target.value;

    if (cityname.length >= 3){
      fetch('http://ctp-zip-api.herokuapp.com/city/:cityname'+ cityname)
        .then((response)=>{
          return response.json();
        })

        .then((jsonBody)=>{

          console.log(jsonBody);

          const zipCom = jsonBody.map((zipCode)=> <Zip data={zipCode}/>);

          this.setState({

            zipCodes: zipCom
          });

        })
    }

    this.setState({

      cityName: cityname

    })

  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Look Up</h2>
        </div>
        <CitySearchField handleChange={this.cityNameChanged} value={this.state.cityName}/>
        <div>
        {this.state.zipCodes}
        </div>
        <p className="App-intro">
         This will allow you to look up and find all the addresses a city has.
        </p>
      </div>
    );
  }
}

export default App;
