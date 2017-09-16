import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  const dataArray = Object.keys(props.data).map((key, i) => {
    if (i < 8)
      return <li>{ key + ': ' + props.data[key] } </li>
  });

  let style = {'fontWeight':'bold'}
  return (<div className="row">
    <div
    className="col-lg-4 col-lg-offset-4 col-md-offset-4 col-sm-offset-4 col-md-4 col-sm-4 panel panel-default text-center">
     <div style={style} className="panel-heading">{props.data.City}, {props.data.State}</div>
      <div  className="panel-body text-left ">
      <ul>
      {dataArray}
      </ul>
      </div>
    </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (<div className="container">

    <div className="row">

    <div className=" col-lg-12 text-center">
      <label>Zip Code:</label>
      <input type="text" placeholder="Enter Zip Code"
             onChange={props.changeHandler} value={props.value} />
    </div>
    </div>
    </div>
  );
}



class App extends Component {

  constructor(){
    super();
    this.state = {
      zipCode : '',
      cities: [],
    };
    this.zipCodeChanged = this.zipCodeChanged.bind(this);
  }


  zipCodeChanged(evt){
    const zip = evt.target.value;
    if (zip.length !== 5)
      return;
    console.log('event');
    fetch('http://ctp-zip-api.herokuapp.com/zip/'+ zip).then((response) =>{
      return response.json();
    }).then((jsonResponse) => {
      console.log(jsonResponse);
      this.setState({
          cities : jsonResponse.map((data) => {
          return (<City data={data} />);
        }),
      });
    }).catch((err) =>{
      this.setState({cities:[]});
      console.log(err);
    });

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField changeHandler={this.zipCodeChanged} />
        <div className="container" >
          {(this.state.cities.length !== 0)? this.state.cities : (<div className="row">
                <div className="col-lg-4 col-lg-offset-4 text-center"><strong>No Results</strong></div>
                </div>)}
        </div>
      </div>
    );
  }
}

export default App;
