import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function Zips(props) {
  return (
    <div>
      {props.data}
    </div>
  );
}

function CitySearchField(props){
  return(
    <div>
      <label>City: </label>
      <input type="text" onChange={props.handleChange} value={props.value} />
    </div>


    );
}





class App extends Component {
  constructor(){
    super();
    this.state ={
      city: "",
      zipList: []
    };

    this.cityChanged = this.cityChanged.bind(this);
  }

  cityChanged(event){
    const city = event.target.value

    this.setState({
      city: city
    });

    var query = city.toUpperCase();

    fetch('http://ctp-zip-api.herokuapp.com/city/'+ query)
      .then((response) =>{
        if(response.ok){
          //console.log(response.json());
          return response.json();
        } else {
          return [];
        }
      })
      .then((zipData) => {
        const zipCodes = zipData.map((zipObj) => {
          return <Zips data={zipObj} key={zipObj} />;
        })
        this.setState({
          zipList: zipCodes
        });
      })



  }




  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>City Search</h2>
        </div>
        <br/>
        <div>
        <CitySearchField value={this.city} handleChange={this.cityChanged} />
        </div>
        <br/>
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.state.city}
          </div>
          <br/>
          <div className = "panel-body">
             
              {this.state.zipList}
            
         </div>
        </div>  
      </div>
    );
  }
}

export default App;
