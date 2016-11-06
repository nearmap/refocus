import {focus} from './actions';


const getFocusHandler = (store)=> ({target})=> {
  const focusElemKey = target.getAttribute('data-focus') || 'unmanaged';
  const currentElemKey = store.getState().focus.element;

  if (currentElemKey !== focusElemKey) {
    store.dispatch(focus(focusElemKey));
  }
};


export default (createStore)=> (reducer, state, enhancer)=> {
  const {documentElement} = document;

  const store = createStore(reducer, state, enhancer);

  documentElement.addEventListener('focus', getFocusHandler(store), true);

  let currentElemKey = null;

  store.subscribe(async ()=> {
    // delay execution to after browser events have been handled.
    await null;

    const focusElemKey = store.getState().focus.element;
    // TODO: Is this premeture optimization?
    // Could just run query selector, but that would happen each time the
    // store changes.
    if (currentElemKey !== focusElemKey) {

      if (focusElemKey === null) {
        document.activeElement.blur();
      } else {
        currentElemKey = focusElemKey;
        const elem = document.querySelector(`[data-focus="${focusElemKey}"]`);
        if (elem) {
          elem.focus();
        }
      }
    }
  });

  return store;
};
