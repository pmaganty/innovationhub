import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Create from "./pages/Create";
import Search from "./pages/Search";
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Home}/>
          <Route path="/create" element={Create} />
          <Route path="/search" element={Search} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
