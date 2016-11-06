

export default (state, action)=> {
  if (state === undefined) {
    return {element: null};
  }

  switch (action.type) {
  case 'focus/focus':
    return {...state, element: action.element};
  case 'focus/clear':
    return {...state, element: null};
  }

  return state;
};
