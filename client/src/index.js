import React from "react";
import ReactDOM from "react-dom";
import "./Index.module.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import AuthReducer from "./Store/Reducers/AuthReducer";
import ProfileReducer from "./Store/Reducers/ProfileReducer";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import PostReducer from "./Store/Reducers/PostReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authReducer: AuthReducer,
  profileReducer: ProfileReducer,
  postReducer: PostReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
