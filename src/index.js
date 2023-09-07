import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Helmet } from "react-helmet";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Huong Duong Shop</title>
    </Helmet>
    <App />
  </React.StrictMode>
  // <App />
);

reportWebVitals();
