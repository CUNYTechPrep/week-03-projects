import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');

    return (
      <div>
        <h1>ReactRedux Application using a boiler template.</h1>
        <h2>In this Application you will find:</h2>
        <h3 className="link-item">Tic Tac Toe Game</h3>
        <h3 className="link-item">City Search App</h3>
      </div>
    );
  }
}
