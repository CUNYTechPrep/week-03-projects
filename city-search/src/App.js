import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (
    <div className = "Results">
      <div className = "col-xs-12">
        <div className = "panel panel-default">
          <div className = "panel-heading">
            <h3 className = "panel-title"> {props.city}</h3>
            </div>
            <div className = "panel-body">
             <ul>
              <li>{props.data}</li>
            </ul>
          </div>
          </div>
          </div>

    </div>);
}

function citySearchField(props) {
  return (<div className="searchinput">
    <div className = "col-xs-12 form-inline">
      <label htmlFor = "city"> City: </label>
      <input className="form-control" type="text"
      placeholder="SPRINGFIELD"
      onChange={props.handleSearch}
      />
      </div>


    </div>);
}


class App extends Component {
  constructor(){
    super();
    this.state={
      city: "",
      zipCode: [],
    }
     this.CityUpdate = this.CityUpdate.bind(this);

      }

      CityUpdate(i){
        const cityName = i.target.value.toUpperCase();

        this.setState({

          city: cityName,
        })

        if(cityName.length != 0){
          fetch("http://ctp-city-api.herokuapp.com/city/" + cityName)
          .then ((response) => {
            if(response.ok){
              return response.json();
            }else {
              return [];
            }
          })
        .then((jsonResponse) => {
          const zipList = jsonResponse.map((zips) =>{
            return <City data= {zips} />;
        });

        this.setState({ zipCode: zipList,});

      })
      .catch((e) => {
        this.setState({
          zipCode: [],
        });
        console.log("Error catch: " + e);
      });
        }
        else {
          this.setState({
            zipCode: [],
          });
        }
      }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City ZipCode Search</h2>
        </div>

        <div className="container-fluid">
        <div className = "row">
          <div className="col-sm-6 col-sm-offset-4">
            <citySearchField city={this.state.city}
              handleSearch={this.CityUpdate} />
              {
                this.state.ZipCode
              }
              </div>
              </div>
              </div>
      </div>
    );
  }
}

export default App;
