import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  const style = {width:'50%'};
  return (
    <div className="panel panel-default center-block" style={style}>
      <div className="panel-heading">
        {props.data.City}
      </div>
      <div className="panel-body">
        <ul>
          <li>Est. Pop: {props.data.EstimatedPopulation}</li>
        </ul>
      </div>
    </div>);
}

function ZipSearchField(props) {
  return (
    <div className="row">
      <form>
        <input type="text" placeholder="Zip Code" className="form-control" onChange={props.handleChange}/>
      </form>
    </div>);
}

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      zipCode: "",
      cities: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    let zip = evt.target.value;
    this.setState({
          zipCode: zip
    });
    if (zip.length == 5) {
      let link = "http://ctp-zip-api.herokuapp.com/zip/" + zip;
      fetch(link).then((response) => {
        return response.json();
      }).then((json) => {
        console.log(json);
        const cityComps = json.map((city) => {return <City data={city} />;});
        this.setState({
          cities: cityComps
        });
      });
    }
      
      console.log(this.state.cities);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={this.handleChange} />
        <div>
          {this.state.zipCode}
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
