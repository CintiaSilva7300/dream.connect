import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screans/login/login';

export default function RoutesConfig() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}
