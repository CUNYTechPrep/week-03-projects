import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import renderHTML from 'react-render-html';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
//IMPORTING CSS TO WEBSITE
import '../../helpers/app.css';
import '../../helpers/tictactoe.css';
import '../../helpers/citysearch.css';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    // if (!isAuthLoaded(getState())) {
    //   promises.push(dispatch(loadAuth()));
    // }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})

export default class App extends Component {
  constructor(props){
    super(props);
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };


  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/home');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    console.log("\n\n==> APP.JS props\n\n", this.props);
    const {user} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
       
        <Helmet {...config.app.head}/>
        
        <Navbar fixedTop inverse collapseOnSelect>
          <Navbar.Header>
            
            <Navbar.Brand>
            </Navbar.Brand>
            <Navbar.Toggle />

          </Navbar.Header>
          
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/myapp">
                <NavItem eventKey={17}>Home</NavItem>
              </LinkContainer>
                            
              <LinkContainer to="/myapp/tictactoe">
                <NavItem eventKey={77}>Tictactoe</NavItem>
              </LinkContainer>

              <LinkContainer to="/myapp/citysearch">
                  <NavItem eventKey={10} className="">City Search</NavItem>
              </LinkContainer>

              <LinkContainer to="/myapp/about">
                  <NavItem eventKey={7} className="">About</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>

        </Navbar>
        
        <div className="app-content">
          {this.props.children}
        </div>
        
        {/* FOOTER CONTENT HERE
        <div className='well text-center'>
        </div>
        */}
        
      
      </div>
    );
  }
}





              // {!auth.isAuthenticated &&
                
              //   <LinkContainer to="">
              //     <NavItem eventKey={6}>{}</NavItem>
              //   </LinkContainer>}
              
              // {!auth.isAuthenticated &&
              //   <LinkContainer to="">
              //     <NavItem eventKey={6}>{}</NavItem>
              //   </LinkContainer>}
              // {auth.isAuthenticated &&
              //   <LinkContainer to="">
              //       <NavItem eventKey={9} className="Account-link">
              //           Account
              //       </NavItem>
              //   </LinkContainer>
              // }
              // {auth.isAuthenticated &&
              //   <LinkContainer to="">
              //       <NavItem eventKey={8} className="logout-link" onClick={this.handleLogout}>
              //           Log out
              //       </NavItem>
              //   </LinkContainer>
              // }



