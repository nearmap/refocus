import {focus} from './actions';


const getFocusHandler = (store)=> ({target})=> {
  const focusElemKey = target.getAttribute('data-focus') || 'unmanaged';
  const currentElemKey = store.getState().focus.element;

  if (currentElemKey !== focusElemKey) {
    store.dispatch(focus(focusElemKey));
  }
};

const getBlurHandler = (store)=> ({relatedTarget})=> {
  // If a focusable element is going to receive focus, the relatedTarget
  // would be set and we can rely on the focus handler to deal with it.
  // Otherwise we must assume there is nothing to focus.
  if (relatedTarget === null || relatedTarget === document) {
    store.dispatch(focus(null));
    return;
  }
};


export default (createStore)=> (reducer, state, enhancer)=> {
  const {documentElement} = document;

  const store = createStore(reducer, state, enhancer);

  documentElement.addEventListener('focus', getFocusHandler(store), true);
  documentElement.addEventListener('blur', getBlurHandler(store), true);

  let currentElemKey = null;

  store.subscribe(async ()=> {
    // delay execution to after browser events have been handled.
    await null;

    const focusElemKey = store.getState().focus.element;
    // TODO: Is this premeture optimization?
    // Could just run query selector, but that would happen each time the
    // store changes.
    if (currentElemKey !== focusElemKey) {
      currentElemKey = focusElemKey;

      if (focusElemKey === null) {
        document.activeElement.blur();
      } else {
        const elem = document.querySelector(`[data-focus="${focusElemKey}"]`);
        if (elem) {
          elem.focus();
        }
      }
    }
  });

  return store;
};
