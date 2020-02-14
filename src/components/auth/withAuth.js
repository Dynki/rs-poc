import React from 'react';

import AuthContext from '../../context/authContext';

export function withAuth(Component) {
  return function AuthComponent(props) {
    return <AuthContext.Consumer>{auth => <Component {...props} auth={auth} />}</AuthContext.Consumer>;
  };
}
