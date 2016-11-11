import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {focus, clearFocus} from '../src/actions';


const App = ({onFocusInput, onFocusSpan, onClearFocus, focusedElem})=> (
  <div className='row' style={{paddingLeft: 50, maxWidth: '50rem'}}>
    <h3>refocus</h3>
    <br />
    <form className=''>
      <p className='row'>
        Tab through the components and observe the changes in the
        redux inspector to the right.
        <br />
        Try any of the buttons to dispatch a <code>focus()</code> action
        and observe the respective elements being focused.
      </p>

      <p className='row'>
        <b>Focused Element:</b>
        <span className="label label-default">
          {focusedElem}
        </span>
      </p>

      <input
        data-focus='input-1'
        type='text'
        className='form-control'
        placeholder='input-1' />
      <br />

      <input
        data-focus='input-2'
        type='text'
        className='form-control'
        placeholder='input-2' />
      <br />

      <input
        type='text'
        className='form-control'
        placeholder='unmanaged' />
      <br />

      <ul className='nav nav-pills'>
        <li>
          <a
            data-focus='link'
            target='_blank' rel='noopener noreferrer'
            href='https://github.com/nearmap/refocus'
          >
            refocus on GitHub
          </a>
        </li>
        <li>
          <a
            target='_blank' rel='noopener noreferrer'
            href='https://github.com/nearmap/refocus/tree/master/example'
          >
            Example Source
          </a>
        </li>
      </ul>
      <br />

      <br />

      <div className='btn-toolbar'>
        <div className='btn-group' role='group'>
          <button
            data-focus='focus-btn-1'
            type='button'
            className='btn btn-default'
            onClick={onFocusInput}
          >
            focus input-1
          </button>

          <button
            data-focus='focus-btn-2'
            type='button'
            className='btn btn-default'
            onClick={onFocusSpan}
          >
            focus link
          </button>
        </div>

        <button
          type='button'
          className='btn btn-default'
          data-focus='clear-btn'
          onClick={onClearFocus}
        >
          clear focus
        </button>
      </div>
      <br />

    </form>
  </div>
);

App.propTypes = {
  onFocusInput: PropTypes.func,
  onFocusSpan: PropTypes.func,
  onClearFocus: PropTypes.func,
  focusedElem: PropTypes.string
};


const mapStateToProps = (state)=> ({
  focusedElem: state.focus.element
});

const mapDispatchToProps = (dispatch)=> ({
  onFocusInput: ()=> dispatch(focus('input-1')),
  onFocusSpan: ()=> dispatch(focus('link')),
  onClearFocus: ()=> dispatch(clearFocus())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
