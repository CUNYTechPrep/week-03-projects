import { LOAD_CITY_REQUEST, LOAD_CITY_SUCCESS, LOAD_CITY_FAILURE, LOAD_ZIP_REQUEST, LOAD_ZIP_SUCCESS, LOAD_ZIP_FAILURE } from '../../redux/modules/constants';

export function fetchZip(zip) {
  return {
    types: [LOAD_ZIP_REQUEST, LOAD_ZIP_SUCCESS, LOAD_ZIP_FAILURE],
    promise: (client) => client.get(`zip/${zip}/`)
  };
}

export function fetchCity(city) {
  return {
    types: [LOAD_CITY_REQUEST, LOAD_CITY_SUCCESS, LOAD_CITY_FAILURE],
    promise: (client) => client.get(`city/${city}/`)
  };
}