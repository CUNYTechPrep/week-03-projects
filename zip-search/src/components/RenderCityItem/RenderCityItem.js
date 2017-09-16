import React, {Component} from 'react';

function hasValue(data) {
  return (data !== undefined) && (data !== null) && (data !== "");
}

export default class RenderCityItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const {singleZip, singleCity} = this.props;
    console.log("PROPS in RenderCityItem.js", this.props);

    return (
      <div>
      {hasValue(singleZip) && !hasValue(singleCity) ? 
        (
          <div className="col-sm-6 col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">{singleZip.City + ", " + singleZip.State}</h3>
              </div>
              <div className="panel-body">
                <ul>
                  <li>State: {singleZip.state}</li>
                  <li>Location: ({singleZip.Lat + ", " + singleZip.Long})</li>
                  <li>Population (estimated): {singleZip.EstimatedPopulation}</li>
                  <li>Total Wages: {singleZip.TotalWages}</li>
                </ul>
              </div>
            </div>
          </div>) :
        (
          <div className="col-sm-1 col-md-1">
            <div className="panel panel-default">
              <h4>{singleCity}</h4>
            </div>
          </div>
        )
      }    
      </div>
    );
  }
}







