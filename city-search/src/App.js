import React, {Component} from 'react';
import './App.css';

function ZipCodeTag(props) {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-body">
            <ul>
              <li key={props.key}>{props.data}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CitySearchField(props){
    return (
    <div className="row">
      <div className="col-xs-12 form-inline">
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          className="form-control"
          value={props.cityName}
          onChange={props.handleChange}
          placeholder="Try NYC" />
      </div>
    </div>
  );
}



class App extends Component {
  constructor(){
    super();
    this.state = { cityName: "", zips: []}  
    this.cityNameChange = this.cityNameChange.bind(this);
  }

  cityNameChange(event) {
    const city = event.target.value;
    this.setState({cityName: city,})
    if(city.length > 2) {
      fetch('http://ctp-zip-api.herokuapp.com/city/'+city)
        .then((response) => {
        // what does the method below accomplish? how is response deemed "ok"?
          if(response.ok) {
            return response.json();
          }
          else {
            return [];
          }
        })
        //I'm guessing jsonResponse refers to the response.json from the previous step, but how does the then function know to take the return value of the previous then function as input?
        //also why don't we have to parse the json before passing it on here?
          .then((jsonResponse) => {
            // can't use map anymore because our input isn't an array of objects like in the Zip Code Search App (project 1, in class) its just an object
            let formattedZips = [];
            for (let prop in jsonResponse) {
            formattedZips.push(<ZipCodeTag data={jsonResponse[prop]} key={prop}/>); 
            }
            this.setState({
            zips: formattedZips,
            })
          })
        .catch((e) => {
          this.setState({
            zips: [],
          });
          console.log("In catch: " + e);
        });
  }
  else {
      this.setState({
        cities: [],
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            {/* the following classes centers the 6 columns */}
            <div className="col-sm-6 col-sm-offset-3">
              <CitySearchField
                cityName={this.state.cityName}
                handleChange={this.cityNameChange} />
              {this.state.zips.length > 0 ? this.state.zips : <div>No Results</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App; 
{/*Why does the line above need to be here?*/}