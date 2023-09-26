import React from 'react';
import RoutesConfig from './routes';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
// import dotenv from 'dotenv';
import './index.css';
// dotenv.config();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesConfig />
  </React.StrictMode>
);
