import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                {props.data.City}
            </div>
            <div className="panel-body">
                <ul>
                    <li>State: {props.data.State}</li>
                    <li>Country: {props.data.Country}</li>
                    <li>Coordinates: ({props.data.Lat} , {props.data.Long})</li>
                    <li>Est. population: {props.data.EstimatedPopulation} </li>
                    <li>Taxes Filed: {props.data.TaxReturnsFiled}</li>
                </ul>
            </div>
        </div>
    );
}

function ZipSearchField(props) {
    return (
        <div>
            <label>Zip Code:</label>
            <input type="text" value={props.value} onChange={ props.handleChange } />
        </div>
    );
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            zipCode: ""
        };
        this.zipCodeChanged = this.zipCodeChanged.bind(this);
    }

    zipCodeChanged(event) {
        const zip = event.target.value;
        if (zip.length === 5){
            console.log(`Fetching http://ctp-zip-api.herokuapp.com/zip/${zip}`)
            fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`).then((response) => {
                if (response.status === 200)
                    return response.json();
            })
            .then((jsonBody) => {
                console.log(jsonBody);
                const cityComps = jsonBody.map((city) => <City data={city} /> );
                this.setState({
                    cities: cityComps
                });
            })
            .catch((err) => {       //Catch errors in Promise chain
                console.log("Try a different zipcode.")
            });
        }
        this.setState({
            zipCode:zip
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Zip Code Search</h2>
                </div>
                <div className="center">
                    <ZipSearchField handleChange={this.zipCodeChanged} value={this.state.zipCode}/>                    
                </div>
                <div>
                    { this.state.cities.length===0 ? (<p> No Results</p>): this.state.cities}
                </div>
            </div>
        );
    }
}

export default App;
