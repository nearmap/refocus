

export default (state, action)=> {
  if (action.type === 'focus/focus') {
    return {...state, element: action.element};
  } else if (state === undefined) {
    return {element: null};
  }

  return state;
};
