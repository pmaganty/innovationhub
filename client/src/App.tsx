import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Create from "./pages/Create";
import Search from "./pages/Search";
import SuccessPayment from './pages/SuccessPayment';
import FailPayment from './pages/FailPayment';
import SuccessSub from './pages/SuccessSub';
import FailSub from './pages/FailSub';
import HomeProt from './pages/HomeProt';
import FailLogin from './pages/FailLogin';
import MyIdeas from './pages/MyIdeas';
import CheckSubmission from './pages/CheckSubmission';

// Top level component that renders all pages and routes
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<HomeProt />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/successfulPayment" element={<SuccessPayment />}/>
        <Route path="/failedPayment" element={<FailPayment />}/>
        <Route path="/successfulSubmission" element={<SuccessSub />}/>
        <Route path="/failedSubmission" element={<FailSub />}/>
        <Route path="/checkSubmission" element={<CheckSubmission />}/>
        <Route path="/failedLogin" element={<FailLogin />}/>
        <Route path="/myIdeas" element={<MyIdeas />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
