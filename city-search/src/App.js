import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function ZipField(props) {
  const style = {width:'50%'};
  return (
    <div className="panel panel-default center-block" style={style}>
      <div className="panel-heading">
        {props.zip}
      </div>
      <div className="panel-body">
        
      </div>
    </div>
  );
}

function CitySearchBar(props) {
  const style = {marginTop: '10px', marginBottom: '10px', width: '50%'};
  return (
    <div className="row">
      <form>
        <input type="text" className="form-control center-block" style={style} onChange={props.handleChange} />
      </form>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      city: "",
      zipCodes: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      city: evt.target.value.toUpperCase()
    });
    let link = "http://ctp-zip-api.herokuapp.com/city/" + evt.target.value.toUpperCase();
    fetch(link).then((response) => {
      if (response.status == 404) {
        console.log(response.status);
        return;
      }
      console.log(response.status);
      return response.json();
    }).then((json) => {
      console.log(json.length);
      const zipComps = json.map((zipCode) => {
        return <ZipField zip={zipCode} />;
      });
      this.setState({
        zipCodes: zipComps
      });

    }).catch((err) => {console.log(this.state.zipCodes,'error');});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchBar handleChange={this.handleChange} />
        <div>
          {this.state.zipCodes}
        </div>
      </div>
    );
  }
}

export default App;