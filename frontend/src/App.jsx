import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} /> {/* ✅ Fixed */}
        <Route path="/register" element={<Register />} /> {/* ✅ Fixed */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
