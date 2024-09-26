import React, { Component } from 'react';
import './App.css';


function City(props) {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{props.data.LocationText}</h3>
            </div>
            <div className="panel-body">
              <ul>
                <li>Zip:{props.data}</li>
                <li>State: {props.data.State}</li>
                <li>Location: ({props.data.Lat}, {props.data.Long})</li>
                <li>Population (estimated): {props.data.EstimatedPopulation}</li>
                <li>Total Wages: {props.data.TotalWages}</li>
    {/* You can add any other data points you want here */}
    </ul>
  </div>
</div>
</div>
</div>
  );
}

function CitySearchField(props) {
    return (
      <div className="row">
        <div className="col-xs-12 form-inline">
          <label htmlFor="city">City Name: </label>
          <input
    type="text"
    id="city"
    className="form-control"
    value={props.cityValue}
    onChange={props.handleChange}
    placeholder="Try NEW YORK" />
</div>
</div>
  );
}



class App extends Component {
    constructor() {
        super();
        this.state = {
            cityValue: "",
            cities: [],
        }

        // Don't forget to bind the event handler
        this.cityValueChanged = this.cityValueChanged.bind(this);
    }
    
    cityValueChanged(event) {
        const city = event.target.value;
        var zip;

        this.setState({
            cityValue: city,
        })
        
       
        if(1) {
            const city = event.target.value;

            this.setState({
                cityValue: city,
            })
            
            fetch('http://ctp-zip-api.herokuapp.com/CITY/'+city)
              .then((response) => {
                  if(response.ok) {
              
                      zip= response.json();
                      console.log(zip);
                  
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
            zip.forEach(function(element){
        
                fetch('http://ctp-zip-api.herokuapp.com/zip/'+element)
                          .then((response)=>{
                              if(response.ok){
                                  return response.json();
                              }
                              else{return [];}

                          })
                            .then((jsonResponse) => {
                                const cities = jsonResponse.map((city) => {
                                    return <City data={city} key={city.RecordNumber} />;
                                });

                                this.setState({
                                    cities: cities,
                                });
                            })
                            .catch((e) => {
                                this.setState({
                                    cities: [],
                                });
                                console.log("In catch: " + e);
                            })
                        })
        } 
 
            }
    

    render() {
        return (
          <div className="App">
            <div className="App-header">
              <h2>CITY Search</h2>
            </div>
            <div className="container-fluid">
              <div className="row">
                {/* the following classes centers the 6 columns */}
                <div className="col-sm-6 col-sm-offset-3">
                  <CitySearchField
        cityValue={this.state.cityValue}
        handleChange={this.cityValueChanged} />
      {this.state.cities.length > 0 ? this.state.cities : <div>No Results</div>}
    </div>
  </div>
</div>
</div>
      );
    }
}

export default App;
