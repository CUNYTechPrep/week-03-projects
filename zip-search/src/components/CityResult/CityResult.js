import React, {Component} from 'react';
import {RenderCityItem} from 'components'

export default class CityResult extends Component {
  constructor(props){
    super(props);
    this.state = {
      zipfield: "",
      cityfield: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitZip = this.handleSubmitZip.bind(this);
    this.handleSubmitCity = this.handleSubmitCity.bind(this);
  }
  
  componentWillReceiveProps(nextProps){
    console.log("==>NEXT PROPS=>", nextProps);
  }

  handleChange = (event) => {
    this.setState ({ [event.target.name]: event.target.value });
  }

  //TODO: simplify both handlesubmit to a single function
  handleSubmitZip = () =>{
    this.props.fetchZip(this.state.zipfield);
  }

  handleSubmitCity = () =>{
    let name = this.state.cityfield.toUpperCase();
    this.props.fetchCity(name);
  }


  render() {
    const {city, zip} = this.props;
    console.log("==>PROPS In CityResult=>", this.props);
    console.log("==>STATE In CityResult=>", this.state);

    const renderInputField = (labelName, type, placeholder, value, name, onClick) =>{
      return(
        <div>
          <div className="col-sm-12 col-md-12 form-field">
            <label className="col-sm-12 col-md-12">{labelName}</label>
            <div className="col-sm-2 col-md-2">
              <input type={type} className="form-control" placeholder={placeholder} value={value} name={name} onChange={this.handleChange} />
            </div>
          </div>
          <div className="col-sm-12 col-md-4 form-field">
            <button className="btn btn-default btn-md" onClick={onClick}>
              Search
            </button>
          </div>
        </div>
      );
    }

    let resultZipList = zip.loaded ? zip.ziplist.map( (singleItem) => <RenderCityItem singleZip={singleItem} singleCity={null} />) : ""; 
    let resultCityList = city.loaded ? city.citylist.map( (singleItem) => <RenderCityItem singleZip={null} singleCity={singleItem}/>) : ""; 

    return (
      <div>

        {renderInputField("Zip Code", "number", "Try 10016", this.state.zipfield, "zipfield", this.handleSubmitZip)}
        <div className="result-area col-sm-12 col-md-12">
          {resultZipList}
        </div>

        {renderInputField("City Name", "text", "Try NewYork", this.state.cityfield, "cityfield", this.handleSubmitCity)}
        <div className="result-area col-sm-12 col-md-12">
          {resultCityList}
        </div>

      </div>
    );
  }
}








