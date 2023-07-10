import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/ReduxStore";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';


// stack overflow

ReactDOM.render(
  <Provider store={store}>
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
