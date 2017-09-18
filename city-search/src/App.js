import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
return (<div className = "panel-body">
<ul>

</ul>

</div>);

  /*.then (data =>{
    let info = data.results.map((information)=>{
      return (
        <div key={information.results}>

        </div>
      )
    })*/
  //this.setState(info:info);
//  console.log("State", this.state.pictures);

//})
}

function ZipSearchField(props) {
return <div></div>
}


class App extends Component {

  constructor(props)
  {

    super(props);
    this.state = {
      city :[],
      zipcodes : [],
      info: [],

    };
    this.ComponentWillMount = this.ComponentWillMount.bind(this);


  };
  ComponentWillMount (props)
  {
    var info;
    var user = (document.getElementById("url").value.toString()).toUpperCase();
    var query = 'http://ctp-zip-api.herokuapp.com/city/' +user;
  fetch(query)
  .then (results =>{
    return results.json()
  }).then (data=> {
    info = data.map(key =>{
      //console.log(key);
      this.state.zipcodes.push(key)
      var list = document.getElementById('list');
      var entry = document.createElement('tr');
      entry.appendChild(document.createTextNode(key));
      list.appendChild(entry);


    }


    );

      this.state.zipcodes.length = 0;
  }).catch(function(){
    document.getElementById("check").innerHTML ="no results found";

  })

  var lNode = document.getElementById("list");
  while (lNode.firstChild) {
      lNode.removeChild(lNode.firstChild);
  }



}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className ="App-body">
        <label>City:</label>
        <input type = "text" id = "url"/>
        <button className="search" onClick ={this.ComponentWillMount}>Click me!</button>

        <ZipSearchField/>

          <p id ="check"></p>
          <table id = "list"className="listtype">
            



          </table>

        </div>
      </div>
    );
  }
}

export default App;
