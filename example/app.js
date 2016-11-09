import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {focus, clearFocus} from '../src/actions';


const App = ({onFocusInput, onFocusSpan, onClearFocus, storeElem})=> (
  <section>
    <input data-focus='input-1' value='input-1' />

    <input data-focus='input-2' value='input-2' />

    <input value='unmanaged' />

    <span tabIndex={0} data-focus='span-1'>
      focusable span
    </span>

    <section>
      <button data-focus='focus-btn-1' onClick={onFocusInput}>
        focus input-1
      </button>

      <button data-focus='focus-btn-2' onClick={onFocusSpan}>
        focus div-1
      </button>

      <button data-focus='clear-btn' onClick={onClearFocus}>
        clear focus
      </button>
    </section>

    <section>
      {storeElem}
    </section>
  </section>
);

App.propTypes = {
  onFocusInput: PropTypes.func,
  onFocusSpan: PropTypes.func,
  onClearFocus: PropTypes.func,
  storeElem: PropTypes.string
};


const mapStateToProps = (state)=> ({
  storeElem: state.focus.element
});

const mapDispatchToProps = (dispatch)=> ({
  onFocusInput: ()=> dispatch(focus('input-1')),
  onFocusSpan: ()=> dispatch(focus('span-1')),
  onClearFocus: ()=> dispatch(clearFocus())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
