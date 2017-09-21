import React, { Component } from 'react';
import './App.css';


function ZipCodesResult(props) {
  return (
    <div className="col-xs-3 col-sm-2 col-md-1">
      <div className="results">
        <div className="panel panel-default">
          <div className="panel-heading">
            {props.data}
          </div>
        </div>
      </div>
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div className="search">
      <form className="form-inline">
        <label className="form-control-static">City:</label>
        <input className="form-control" type="text" placeholder="Try typing New York" onChange={props.handleClick} />
      </form>
    </div>);
}


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      city: "",
      zipCodes: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    let city_in = i.target.value.toUpperCase();
    this.setState({
      city: city_in
    });
    fetch("http://ctp-zip-api.herokuapp.com/city/" + city_in).then((response) => {
      if (response.status === 404) {
        return;
      }
      return response.json();
    }).then((json) => {
      const zipComps = json.map((zipCode) => {return <ZipCodesResult data={zipCode} />;});
      this.setState({
        zipCodes: zipComps
      });
    }).catch((e) => {});
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField handleClick={this.handleClick} />
        <div>
          <h4 className="zipCodeHeader">Zip codes:</h4>
          {this.state.zipCodes}
        </div>
      </div>
    );
  }
}

export default App;
