import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Create from "./pages/Create";
import Search from "./pages/Search";
import Email from "./pages/Email";
import SuccessPayment from './pages/SuccessPayment';
import FailPayment from './pages/FailPayment';
import SuccessSub from './pages/SuccessSub';
import FailSub from './pages/FailSub';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/email" element={<Email />}/>
        <Route path="/successfulPayment" element={<SuccessPayment />}/>
        <Route path="/failedPayment" element={<FailPayment />}/>
        <Route path="/successfulSubmission" element={<SuccessSub />}/>
        <Route path="/failedSubmission" element={<FailSub />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
