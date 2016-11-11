import {createStore, compose} from 'redux';

import focusEnhancer from '../src/enhancer';

import reducers from './reducers';

import DevTools from './devtools';


const initialState = {};

export default createStore(
  reducers,
  initialState,
  compose(
    focusEnhancer,
    DevTools.instrument()
  )
);
