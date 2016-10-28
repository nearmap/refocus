import {createStore, compose} from 'redux';

import focusEnhancer from '../src/enhancer';

import reducers from './reducers';


function getReduxDevTools() {
  const {devToolsExtension} = window; // eslint-disable-line no-undef
  let enhancer = (arg)=> arg;

  /* istanbul ignore if */
  if (typeof devToolsExtension === 'function') {
    enhancer = devToolsExtension();
  }
  return enhancer;
}


const initialState = {};

export default createStore(
  reducers,
  initialState,
  compose(
    focusEnhancer,
    getReduxDevTools()
  )
);
