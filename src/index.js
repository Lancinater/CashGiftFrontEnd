import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './Header/header';
import Menu from './Menu/menu';
import Footer from './Footer/footer';
import Login from './Login/login'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Register from './Register/register'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <div className='d-flex flex-column vh-100'>
      <Header />
      <div className='flex-grow-1'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
      <Footer />
    </div>
    </BrowserRouter>
    
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
