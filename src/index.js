import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store/store";

import * as serviceWorker from "./serviceWorker";
import AppWrapper from "./AppWrapper";

// Todo - Footer
// Todo - Change Icon
// Todo - Must Logged In to Like
// Todo - Demo Identifiers
// Todo - Verify Header color when
// Todo - Verify
// Todo - Change Theme Colors
// Todo - Fake Data (blogs, authors, etc.)
// Todo - MUI installed twice
// Todo - When a page is refresh, header color is lost
// Todo - Verify when dispatch action to get right data (after login, for example)

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
