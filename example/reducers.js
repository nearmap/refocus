import {combineReducers} from 'redux';

import focusReducer from '../src/reducer';


export default combineReducers({
  focus: focusReducer
});
