import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import config from "./auth_config.json";
import AuthProvider from './components/auth/AuthProvider';

ReactDOM.render(
    <AuthProvider clientId={config.clientId} domain={config.domain}>
        <App />
    </AuthProvider>,
    document.getElementById("root")
);

serviceWorker.unregister();