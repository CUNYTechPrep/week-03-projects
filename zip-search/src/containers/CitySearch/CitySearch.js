import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { CityResult } from 'components';
import { fetchCity, fetchZip } from '../../actions/City/actions';

class CitySearch extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="container">
        <CityResult city={this.props.city} zip={this.props.zip} {...this.props.actions} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    actions: bindActionCreators({fetchCity, fetchZip}, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    city: state.city,
    zip: state.zip
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(CitySearch)