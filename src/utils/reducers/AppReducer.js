export const actions = {
  OPEN_DRAWER: 'OPEN_DRAWER',
  CLOSE_DRAWER: 'CLOSE_DRAWER'
}

function reducer(state, action) {
  console.log('Action', action);
  console.log('state', state);

  switch (action.type) {
    case actions.OPEN_DRAWER:
      console.log('Setting drawer open')
      return { drawerOpen: true };
    case actions.CLOSE_DRAWER:
      console.log('Setting drawer closed')
      return { drawerOpen: false };
    default:
      throw new Error();
  }
}

export default reducer;