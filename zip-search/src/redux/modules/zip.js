import {
  LOAD_ZIP_REQUEST, LOAD_ZIP_SUCCESS, LOAD_ZIP_FAILURE
} from './constants';

const initialState = {
  isFetching: false,
  loaded: false,
  ziplist: [],
}

export default function zip(state = initialState, action = {}){
  switch (action.type){
    case LOAD_ZIP_REQUEST:
      return Object.assign({}, state, { 
        isFetching: true, 
        loaded: false,
      });

    case LOAD_ZIP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        ziplist: action.result
      });
    case LOAD_ZIP_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    default:
      return state;
  }
}

export function isLoaded(globalState, zipID) {
  return globalState.zip && globalState.zip.loaded && (globalState.zip.id === zipID);
}

export function sucess() {
  return { type: LOAD_ZIP_SUCCESS };
}
