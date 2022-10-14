import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from './component/Details/Details';
import Search from './component/Navbar/Search';
import Genres from './component/Genres/Genres';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/search/:name" element={<Search />} />
        <Route path="/genres/:genre" element={<Genres />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
