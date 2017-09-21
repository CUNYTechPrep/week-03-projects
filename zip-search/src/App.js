import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div className="centered">
      <div className="panel panel-default">
          <div className="panel-heading">
              {props.data.LocationText}
          </div>
          <div className="panel-body">
              <ul>
                  <li>State: {props.data.State}</li>
                  <li>Location: ({props.data.Lat}, {props.data.Long})</li>
                  <li>Population (estimated): {props.data.EstimatedPopulation}</li>
                  <li>Total Wages: {props.data.TotalWages}</li>
              </ul>
          </div>
      </div>
  </div>);
}

function ZipSearchField(props) {
  return (
      <div className="col-md-4 col-md-offset-5">
          <form className="form-inline">
              <label>Zip Code:</label>
              <input className="form-control"
                     type="text"
                     placeholder="Try 10016"
                     onChange={props.handleClick}
              />
          </form>
      </div>
  );
}


class App extends Component {
    constructor(props) {
        super();
        this.state = {
            zipCode: "",
            cities: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(text) {
        let zip = text.target.value;
        this.setState({
            zipCode: zip
        });
        let url = "http://ctp-zip-api.herokuapp.com/zip/";
        if (zip.length === 5) {
            // console.log('here');
            fetch(url + zip)
                .then((response) => {
                    return response.json();
                }).then((json) => {
                    const cityArray = json.map((response) => {
                        return <City data={response}/>;
                    });
                    this.setState({
                        cities: cityArray
                    });
            });
        }
    }

    renderResults() {
        if (this.state.zipCode === "") {
            return <p className="centered">No Results</p>;
        }
        else {
            return this.state.cities;
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Zip Code Search</h2>
                </div>

                <ZipSearchField handleClick={this.handleClick}/>

                <div className="margin-top-80">
                    {this.renderResults()}
                </div>
            </div>
        );
}
}

export default App;
