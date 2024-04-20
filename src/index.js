import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bootstrap from 'bootstrap';
import Header from './Header/header';
import Menu from './Menu/menu';
import Footer from './Footer/footer';
import Login from './Login/login'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <div className='d-flex flex-column vh-100'>
      <Header />
      <div className='flex-grow-1'>
        <Login />
      </div>
      <Footer />
    </div>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
