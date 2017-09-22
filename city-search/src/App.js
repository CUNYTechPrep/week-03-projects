import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCode(props) {
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3>{props.data}</h3>
            </div>
            <div className="panel-body">
                
            </div>
        </div>
    );
}

function CitySearchField(props) {
    return (
        <div>
            <label>City Name: </label>
            <input type="text" value={props.value} onChange={props.handleChange} />
        </div>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zips: [],
            city: "",
        };
        this.cityChanged = this.cityChanged.bind(this);
    }

    cityChanged(event) {
        const city = event.target.value;
        if (city.length >= 2 ){
            console.log(`Fetching http://ctp-zip-api.herokuapp.com/city/${city}`);
            fetch(`http://ctp-zip-api.herokuapp.com/city/${city.toUpperCase()}`).then((response) => {
                console.log(response.status)
                if (response.status === 200){
                    return response.json();
                }
            })
            .then((jsonBody) => {
                console.log(jsonBody);
                const zipComps = jsonBody.map((zip) => <ZipCode data={zip} />);
                this.setState({
                    zips: zipComps
                });
            })
            .catch((err) => {
                console.log("Try a different city name.");
                this.setState({
                    zips: []
                });
            });
        }
        this.setState({
            city:city
        });

    }

    render() {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
            </div>
            <div className="container">
                <div className="col-md-8">
                    <CitySearchField handleChange={this.cityChanged} value={this.state.city}/>
                </div>
                <div className="col-md-4">
                    {this.state.zips.length===0 ? (<p>No Zipcodes Found</p>) : this.state.zips}
                </div>
            </div>
        </div>
    );
    }
}

export default App;
