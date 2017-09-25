import React, { Component } from 'react';

import './App.css';







function ZipCode(props) {

  return (

    

    <div className="row">

      <div className="col-xs-12">

      

        <div className="panel panel-default">

          <div className="panel-heading">

            <h3 className="panel-title">{props.data.LocationText}</h3>

          </div>

          <div className="panel-body">

            <ul>

              <li>ZipCode: {props.data.ZipCode}</li>

            

            </ul>

          </div>

        </div>

         

      </div>

    </div>

   

  );

}




function CitySearchField(props) {

  return (

    <div class="row">

      <div class="col-xs-12 form-inline">

        <label htmlFor="city">City: </label>

        <input

          type="text"

          id="city"

          class="form-control"

          value={props.cityValue}

          onChange={props.handleChange}

          placeholder="Try Bronx" />

      </div>

    </div>

  );

}










class App extends Component {

  constructor() {

    super();

    this.state = {

      cities: "",

      zipValue: [],

    }




    // Don't forget to bind the event handler

    this.cityValueChanged = this.cityValueChanged.bind(this);

  }




  cityValueChanged(event) {

    const city = event.target.value;




    this.setState({

      cityValue: city,

    })




    if(alert(typeof city)) { //if the value is a string then go on 

      fetch('http://ctp-zip-api.herokuapp.com/city/'+ city)

        .then((response) => {

          if(response.ok) {

            return response.json();

          } else {

            return [];

          }

          /*

            if we were to just return response.json() here

            then an exception will be thrown if there is an 

            error, and the catch() function below would execute.

            The exception occurs because the API does not return 

            a proper json body when a 404 occurs.

          */

        })

        .then((jsonResponse) => {

          const zipValue = jsonResponse.map((city) => {

            return <zipValue data={city} key={city.RecordNumber} />;

          });




          this.setState({

            zipValue: zipValue,

          });

        })

        .catch((e) => {

          this.setState({

            zipValue: [],

          });

          console.log("In catch: " + e);

        });

    } else {

      this.setState({

        zipValue: [],

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

          

            <div className="col-sm-6 col-sm-offset-3">

              <CitySearchField

                cities={this.state.city}

                handleChange={this.zipValueChanged} />

              {this.state.cities.length > 0 ? this.state.zipValue : <div>No Results</div>}

            </div>

          </div>

        </div>

      </div>

    );

  }

}




export default App;