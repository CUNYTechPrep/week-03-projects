import React, { Component } from 'react';
import './App.css';


function City(props) {
    return (<div className="centered">
        <div className="panel panel-default">
            <div className="panel-heading">
                {props.data}
            </div>
        </div>
    </div>);
}

function CitySearchField(props) {
    return (
        <div className="col-md-4 col-md-offset-5">
            <form className="form-inline">
                <label>City:</label>
                <input className="form-control"
                       type="text"
                       placeholder="Try TARRYTOWN"
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
            city: "",
            zipCodes: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(text) {
        let city = text.target.value;
        this.setState({
            city: city
        });
        let url = "http://ctp-zip-api.herokuapp.com/city/";
        if (city.length > 0) {
            // console.log('here');
            fetch(url + city)
                .then((response) => {
                    return response.json();
                }).then((json) => {
                const zipCodes = json.map((response) => {
                    console.log(response);
                    return <City data={response}/>;
                });
                this.setState({
                    zipCodes: zipCodes
                });
            }).catch((e) => {});
        }
    }

    renderResults() {
        if (this.state.city === "") {
            return <p className="centered">No Results</p>;
        }
        else {
            return this.state.zipCodes;
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>City Search</h2>
                </div>

                <CitySearchField handleClick={this.handleClick}/>

                <div className="margin-top-80">
                    {this.renderResults()}
                </div>
            </div>
        );
    }
}

export default App;
