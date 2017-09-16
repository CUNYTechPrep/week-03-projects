import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Square extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}
