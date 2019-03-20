const reducers = (state = '', action) => {
  if (action.type === 'ADD_PLATFORM') {
    return {
      ...state,
      platform: action.platform
    }
  } else {
    return state
  }
}

export default reducers