import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Workspace from "./views/workspace/Workspace";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import initStore from "./store/root/store";
import setUpAxiosInterceptors from "./utils/axios-interceptor";
import Board from "./views/board/Board";
import Register from "./views/auth/Register";
import LogIn from "./views/auth/LogIn";


setUpAxiosInterceptors(() => console.log("axios error"));

const store = initStore();

ReactDOM.render(
  <div>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* <Route index element={<App />} /> */}
            <Route>
              <Route path="" element={<Workspace />} />
            </Route>

            <Route path="board">
              <Route path=":shipmentId" element={<Board />} />
            </Route>

            <Route path="register">
              <Route path="" element={<Register/>}></Route>
            </Route>
            <Route path="login">
              <Route path="" element={<LogIn/>}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
