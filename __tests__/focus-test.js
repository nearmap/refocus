import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, compose, combineReducers} from 'redux';

import {focus, clearFocus} from '../src/actions';
import focusEnhancer from '../src/enhancer';
import focusReducer from '../src/reducer';


const reducers = combineReducers({
  focus: focusReducer
});

const initialState = {};


const createApp = ()=> (
  <div>
    <input id='unmanaged-elem' />
    <input data-focus='test-elem-1' />
  </div>
);

const container = document.createElement('div');
document.getElementsByTagName('body')[0].appendChild(container);


describe('focus actions', ()=> {
  let store = null;
  let testElem1 = null;
  let unmanagedElem = null;

  beforeEach(()=> {
    store = createStore(reducers, initialState, compose(focusEnhancer));
    ReactDOM.render(createApp(), container);
    testElem1 = document.querySelector('[data-focus="test-elem-1"]');
    unmanagedElem = document.getElementById('unmanaged-elem');
  });


  it('should update store after dispatching focus(elem)', ()=> {
    store.dispatch(focus('test-elem-1'));

    expect(store.getState().focus).toEqual({element: 'test-elem-1'});
  });

  it('should focus element after dispatching focus(elem)', async ()=> {
    store.dispatch(focus('test-elem-1'));
    await null;

    expect(document.activeElement).toBe(testElem1);
  });

  it('should ignore unknown elements when dispatching focus(elem)', async ()=> {
    store.dispatch(focus('test-elem-1'));
    await null;
    store.dispatch(focus('unknown-elem'));
    await null;

    expect(document.activeElement).toBe(testElem1);
  });

  it('should update store when managed element received focus', ()=> {
    testElem1.focus();

    expect(store.getState().focus).toEqual({element: 'test-elem-1'});
  });

  it('should update store when unmanaged element received focus', ()=> {
    testElem1.focus();
    unmanagedElem.focus();

    expect(store.getState().focus).toEqual({element: 'unmanaged'});
    expect(document.activeElement).toBe(unmanagedElem);
  });

  it('should have reducer ignore other actions', ()=> {
    testElem1.focus();

    store.dispatch({type: 'foobar/spam'});

    expect(store.getState().focus).toEqual({element: 'test-elem-1'});
  });

  it('should blur focused element', async ()=> {
    testElem1.focus();
    await null;

    store.dispatch(clearFocus());

    expect(store.getState().focus).toEqual({element: null});
  });

  it('should blur focused unmanaged element', async ()=> {
    unmanagedElem.focus();
    await null;

    store.dispatch(clearFocus());

    expect(store.getState().focus).toEqual({element: null});
  });
});
