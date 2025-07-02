import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import Home from "./pages/home";
import OrderHistory from "./pages/history";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/order-history"
              element={
                <PrivateRoute>
                  <OrderHistory />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
