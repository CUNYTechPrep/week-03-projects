import React, { Component } from 'react';

export function City(props){
  return (
    <div className = "Cities">
      <h1>ZipCode: {props.data.Zipcode}</h1>
      <p>City: {props.data.City}</p>
      <p>State: {props.data.State}</p>
      <p>Location: {props.data.Location}</p>
      <p>Longitude/Latitude: ({props.data.Long} , {props.data.Lat})</p>
    </div>
  )
}

export class CitySeachField extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: false,
      data: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const value = this.state.value
    const url = `http://ctp-zip-api.herokuapp.com/city/${value.toUpperCase()}`
    this.setState({
      value: '',
      error: false,
      data: []
    })
    fetch(url).then((Response) => {
      return Response.json()
    }).then((json) => {
      json.map((element) => {
        const zipUrl = `http://ctp-zip-api.herokuapp.com/zip/${element}`
        return fetch(zipUrl).then((res) => {
          return res.json();
        }).then((json) => {
          if (json[0].City.toUpperCase() === value.toUpperCase()) {
            this.setState({
              data: this.state.data.concat(json),
              value: '',
              error: false
            })
          }
        })
      });


    }).catch((ex) => {
      console.log(ex);
      this.setState({
        value: '',
        error: true
      })

    });

  }

  render(){
    let zipcodes;
    if (this.state.data.length > 0) {
      zipcodes = this.state.data.map((entry) => {
        return <City key ={entry.RecordNumber} data ={entry}/>;
      });
    }
    if (this.state.error) {
      zipcodes = [];
      zipcodes.push( <h1> Not Found </h1>);
      zipcodes.push( <p> or miss spelled </p>);
    }
    return (
      <div className="Search">
          <form onSubmit={this.handleSubmit}>
              <label>
                  City:
                  <input type="text"  value={this.state.value} onChange={this.handleChange} />
              </label>
          </form>
          <div >{zipcodes}</div>
      </div>
    );
  }
}
export default CitySeachField; 