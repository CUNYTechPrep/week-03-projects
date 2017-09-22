import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCode(props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading"></div>
      <div className="panel-body">
        <ul>
          <li>{props.data}</li> 
        </ul>
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
        <input type="text" value={props.city} onChange={props.handleChange}/>
        </form>
      </div>
    </div>
  );
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      zipCodes: []
    }

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const cityInput = event.target.value.toUpperCase();
    this.setState({
      city: cityInput,
    })

      fetch('http://ctp-zip-api.herokuapp.com/city/'+cityInput)
        .then((response) => {
          if(response.ok) {
            return response.json(); 
          } else {
            return [];
          }
        })
        .then((jsonBody) => {
          const zipArray = jsonBody.map((zips) => {
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
          <h1>City Search</h1>
        </div>
          <SearchField city={this.state.city} handleChange={this.handleChange} /> 
              { this.state.zipCodes }
        </div>
          
    );
  }
}
export default App;