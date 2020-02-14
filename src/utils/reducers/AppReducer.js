export const actions = {
  OPEN_DRAWER: 'OPEN_DRAWER',
  CLOSE_DRAWER: 'CLOSE_DRAWER'
}

function reducer(state, action) {
  switch (action.type) {
    case actions.OPEN_DRAWER:
      return { drawerOpen: true };
    case actions.CLOSE_DRAWER:
      return { drawerOpen: false };
    default:
      throw new Error();
  }
}

export default reducer;