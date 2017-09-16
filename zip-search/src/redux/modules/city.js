import {
  LOAD_CITY_REQUEST, LOAD_CITY_SUCCESS, LOAD_CITY_FAILURE
} from './constants';

const initialState = {
  isFetching: false,
  loaded: false,
  citylist: [],
}

export default function city(state = initialState, action = {}){
  switch (action.type){
    case LOAD_CITY_REQUEST:
      return Object.assign({}, state, { 
        isFetching: true, 
        loaded: false,
      });

    case LOAD_CITY_SUCCESS:
      console.log("\n=>IN REDUX", action);
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        citylist: action.result
      });
    case LOAD_CITY_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    default:
      return state;
  }
}

export function isLoaded(globalState, cityID) {
  return globalState.city && globalState.city.loaded && (globalState.city.id === cityID);
}

export function sucess() {
  return { type: LOAD_CITY_SUCCESS };
}





  // RecordNumber: "",
  // Zipcode: "",
  // ZipCodeType: "",
  // City: "",
  // State: "",
  // LocationType: "",
  // Lat: "",
  // Long: "",
  // Xaxis: "",
  // Yaxis: "",
  // Zaxis: "",
  // WorldRegion: "",
  // Country: "",
  // LocationText: "",
  // Location: "",
  // Decommisioned: "",
  // TaxReturnsFiled: "",
  // EstimatedPopulation: "",
  // TotalWages: "",
  // Notes: ""




        // RecordNumber: action.result[0].id,
        // Zipcode: action.result[0].name,
        // ZipCodeType: action.result[0].slug,
        // City: action.result[0].favorited,
        // State: action.result[0].minimum_investment,
        // LocationType: action.result[0].investment_term_start, // ?
        // Lat: action.result[0].investment_term_end, // ?
        // Long: action.result[0].annual_rate_return_start, // ?
        // Xaxis: action.result[0].annual_rate_return_end, // ?
        // Yaxis: action.result[0].fundraise_progress, // ?
        // Zaxis: action.result[0].short_description, // ?
        // WorldRegion: action.result[0].description, // ?
        // Country: action.result[0].deal_category, // ?
        // LocationText: action.result[0].images,
        // Location: action.result[0].city,
        // Decommisioned: action.result[0].state,
        // TaxReturnsFiled: action.result[0].country,
        // EstimatedPopulation: action.result[0].closed,
        // TotalWages: action.result[0].partners,
        // Notes: action.result[0].images