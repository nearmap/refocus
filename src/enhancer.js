import {focus} from './actions';


const getFocusHandler = (store)=> ({target})=> {
  let focusElemKey = null;
  let elem = target;

  const currentElemKey = store.getState().focus.element;

  while (elem !== null && focusElemKey === null) {
    focusElemKey = elem.getAttribute('data-focus');
    elem = elem.parentElement;
  }

  focusElemKey = focusElemKey || 'unmanaged';

  if (currentElemKey !== focusElemKey) {
    store.dispatch(focus(focusElemKey));
  }
};

const getBlurHandler = (store)=> ({relatedTarget})=> {
  // If a focusable element is going to receive focus, the relatedTarget
  // would be set and we can rely on the focus handler to deal with it.
  // Otherwise we must assume there is nothing to focus.
  if (relatedTarget === null) {
    store.dispatch(focus(null));
    return;
  }
};


export default (createStore)=> (reducer, state, enhancer)=> {
  const {documentElement} = document;

  const store = createStore(reducer, state, enhancer);

  documentElement.addEventListener('focus', getFocusHandler(store), true);
  documentElement.addEventListener('focusout', getBlurHandler(store));

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
