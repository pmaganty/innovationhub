import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Create from "./pages/Create";
import Search from "./pages/Search";
import Email from "./pages/Email";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/email" element={<Email />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
