

export default (state, action)=> {
  if (action.type === 'focus/focus') {
    return {...state, element: action.element};
  }

  return {...state, element: null};
};
