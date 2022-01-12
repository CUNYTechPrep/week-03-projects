import React, { Component } from 'react';
import './App.css';

function ZipCodes(props){
  return(
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Zip Codes for: {props.data.LocationText}</h3>
          </div>
          <div className="panel-body">
            {props.data.ZipCode}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchField(props){
  return(
    <div className="row">
      <div className ="col-xs-12 form-inline">
        <label htmlFor="city">City Name: </label>
        <input
         type="text"
         id="city"
         className="form-control"
         value={props.cityName}
         onChange={props.handleChange}
         placeholder="Enter city name..."/>
      </div>
    </div>
  );
}



export default App;
