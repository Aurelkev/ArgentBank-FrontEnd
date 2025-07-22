import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignIn from "./pages/SignIn/SignIn";
import Layout from "./components/Layout/Layout";
import User from "./pages/User/User";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
