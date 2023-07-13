import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screans/login';
import Home from './screans/home/';
import Signup from './screans/signup';

export default function RoutesConfig() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}
