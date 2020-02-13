import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import * as serviceWorker from "./serviceWorker";
import AuthProvider from './components/auth/AuthProvider';
import Theme from './utils/theme';

ReactDOM.render(
    <AuthProvider clientId={process.env.REACT_APP_AUTH_CLIENTID} domain={process.env.REACT_APP_AUTH_DOMAIN}>
        <Theme>
            <App />
        </Theme>
    </AuthProvider>,
    document.getElementById("root")
);

serviceWorker.unregister();