import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  const c = props.entry;
  return (

    <div className="panel panel-default">
      <div className ="panel-heading">
        {c.City},{c.State}
      </div>
      <div className = "panel-body">
        <ul>
          <li> State: {c.State}</li>
          <li> Location: ({c.Lat}, {c.Long})</li>
          <li> Est Pop: {c.EstimatedPopulation}</li>
          <li> Total Wages: {c.TotalWages}</li>
        </ul>
      </div>
    </div>);
}

function ZipSearchField(props) {
  return (
    <div className="input-area">

      <label className="box-text">{props.labelText}</label>

      <input className="box" type="text" onChange={props.handleChange} name={props.value} />
    </div>);
}


class App extends Component {
  constructor(){
    super();

    this.state = {
      zip_city: true,

      out:[],

      input:""
      
    };

    this.zipChanged = this.zipChanged.bind(this);

    this.onTypeButtonClick = this.onTypeButtonClick.bind(this);
  }

  zipChanged(event){
    const addon = ((this.state.zip_city ) ? "zip/" : "city/");
    
    const textEntry = event.target.value.toUpperCase();

    let out = <div></div>;
    
    if((this.state.zip_city  && textEntry.length === 5) || !this.state.zip_city){
      
      fetch("http://ctp-zip-api.herokuapp.com/" + addon + textEntry)
      .then((response) => {
        return response.json();
      })
      
      .then((jsonData) =>{

        if(this.state.zip_city){
          out = jsonData.map(c=> {
            return <City entry = {c} />;
          });
        }
        else {
          out = jsonData.map(c=> {
            return <label className="slot">{c}</label>;
          });
          out = <div className="zip-table">{out}</div>;
        }

        this.setState({

          input: textEntry,
          out: out,
        })
      })
          }else {
      this.setState({
        out:out,
      })
    }
  }

  onTypeButtonClick(){
    this.setState({
      zip_city: (this.state.zip_city) ? false : true,
    })
  }

  render() {
    const textLabel = (this.state.zip_city ) ? "Zip Code: " : "City Name: ";
    
    const textButton = (this.state.zip_city )? "Look up cities by zip-codes" : "Look up zip-codes by city"
    return (
      <div className="App">
        <div className="App-header">

          <h2>Zip Code Search</h2>

        </div>
        <div>

          <div className ="user-field">
            
            <button className ="type-button" onClick = {this.onTypeButtonClick}>{textButton}</button>
            
            <ZipSearchField handleChange={this.zipChanged} value={this.state.in} labelText = {textLabel} /> 
          
          </div>
        
          <div>{this.state.out}</div>
    
        </div>
      </div>
    );
  }
}

export default App;
