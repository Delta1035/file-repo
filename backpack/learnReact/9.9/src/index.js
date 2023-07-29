import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "mobx-react";
import store from "./mobx/store";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from '../src/utils/authConfig';
import * as Style from './indexstyle'
import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication(msalConfig);
ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <MsalProvider instance={msalInstance}>
      <Style.IndexStyle>
        <App />
      </Style.IndexStyle>
    </MsalProvider>
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
