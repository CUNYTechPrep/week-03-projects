import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className = "Results">
      <div className = "col-xs-12">
        <div className = "panel panel-default">
          <div className = "panel-heading">
            <h3 className = "panel-title"> {props.data.LocationText}</h3>
            </div>
            <div className = "panel-body">
             <ul>
              <li>State: {props.data.State}</li>
              <li>Region: {props.data.WorldRegion}</li>
              <li>Location: ({props.data.Lat}), ({props.data.Long})</li>
              <li>Estimated Population: {props.data.EstimatedPopulation}</li>
              <li>Total Wages: { "$ " + props.data.TotalWages}</li>
            </ul>
          </div>
          </div>
          </div>

    </div>);
}

function ZipSearchField(props) {
  return (<div className="searchinput">
    <div className = "col-xs-12 form-inline">
      <label htmlFor = "zip"> Zip Code: </label>
      <input className="form-control" type="text"
      placeholder="Try 10016"
      onChange={props.handleSearch}
      />
      </div>


    </div>);
}


class App extends Component {
  constructor(){
    super();
    this.state={
      zipCode: "",
      cities: [],
    }
     this.zipCodeUpdate = this.zipCodeUpdate.bind(this);

      }

      zipCodeUpdate(i){
        const zip = i.target.value;

        this.setState({

          zipCode: zip,
        })

        if(zip.length === 5){
          fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip)
          .then ((response) => {
            if(response.ok){
              return response.json();
            }else {
              return [];
            }
          })
        .then((jsonResponse) => {
          const cities = jsonResponse.map((city) =>{
            return <City data= {city} key = {city.RecordNumber} />;
        });

        this.setState({ cities: cities,});

      })
      .catch((e) => {
        this.setState({
          cities: [],
        });
        console.log("Error catch: " + e);
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
          <h2>Zip Code Search</h2>
        </div>

        <div className="container-fluid">
        <div className = "row">
          <div className="col-sm-6 col-sm-offset-4">
            <ZipSearchField
              handleSearch={this.zipCodeUpdate} />
              {
                this.state.cities.length > 0 ? this.state.cities :
                <div className="col-sm-offset-2"> Enter 5-digit Zip Code </div>
              }
              </div>
              </div>
              </div>
      </div>
    );
  }
}

export default App;
