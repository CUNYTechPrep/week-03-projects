import React, { Component } from 'react';
import './App.css';


function ZipCode(props) {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"></h3>
          </div>
          <div className="panel-body">
            <ul>
              <span>{props.data}</span> 
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchField(props) {
  return (
    <div className="row">
      <div className="col-xs-12">
        <form>
        <label> City: </label>
        <input type="text" value={props.city} onChange={props.handleChange} placeholder="Try Springfield" />
        </form>
      </div>
    </div>
  );
}



class App extends Component {
  constructor() {
    super();//call component constructor
    this.state = {
      city: "",
      zipCodes: [],
    }

    //bind event handler
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const cityInput = event.target.value.toUpperCase();  //value of search field on change. 

    this.setState({
      city: cityInput,
    })

    //only fetch url if 5 digit zip code
      fetch('http://ctp-zip-api.herokuapp.com/city/'+cityInput)
        .then((response) => {
          if(response.ok) {
            return response.json(); //return json if there are no issues
          } else {
            return [];
          }
        })
        .then((json) => {
          const zipArray = json.map((zips) => {
            return <ZipCode data={zips}/>; 
          });

          this.setState({
            zipCodes: zipArray,
          });
        })
        .catch((ex) => {
          this.setState({
            zipCodes: [],
          });
          console.log("Error in catch " + ex);
        });

}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-sm-3">
              <SearchField city={this.state.city} handleChange={this.handleChange} /> 
              { this.state.zipCodes }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;