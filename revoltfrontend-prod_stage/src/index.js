import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
//////////////clevertap initialization////////
import clevertap from "clevertap-web-sdk";
import Test from "./Test";
import { BrowserRouter } from "react-router-dom";
clevertap.init(process.env.REACT_APP_CLEVERTAP_KEY, "in1");
clevertap.spa = true;
clevertap.privacy.push({ useIP: true });

// console.log = ()=>{}

///
// clevertap.notifications.push({

//   "apnsWebPushId": '<apple web push id>',
//   "apnsWebPushServiceUrl": '<safari package service url>',
//   "titleText":'Would you like to receive Push Notifications?',
//   "bodyText":'We promise to only send you relevant content and give you updates on your transactions',
//   "okButtonText":'Sign me up!',
//   "rejectButtonText":'No thanks',
//   "okButtonColor":'#F28046',
//   "askAgainTimeInSeconds":5,
//   "serviceWorkerPath": "./clevertap_sw.js"
// });

//////////////////////////////////
ReactDOM.hydrate(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.hydrate(
//     <Test />, document.getElementById("root"),
// );
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
