import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import multireducer from 'multireducer';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import auth from './auth';
import city from './city'
import zip from './zip'
import counter from './counter';
import {reducer as form} from 'redux-form';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  city,
  zip,
});
