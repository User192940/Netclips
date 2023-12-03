import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Preview from "./components/Preview";
import { useEffect, useState } from "react";
import axios from "axios";
import requests from "./Requests";

function App({}) {
  
  
  return (
    <>
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path='/index.html' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>} />
      </Routes>
    </AuthContextProvider>
    </>
  );
}

export default App;
