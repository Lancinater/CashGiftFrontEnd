import React from "react";
import './menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function Menu(){
    
    let navigate = useNavigate();

    function handleGoback(){
        navigate('/login')
    }

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <div className="display-4 mb-4 ">
        Cash Gift Lookup
      </div>
      <div className='d-flex justify-content-center'>
        <h1>
            To be implemented
        </h1>
        <button onClick={handleGoback} className="btn btn-primary me-3">Go back</button>
      </div>
      
      
    </div>
        
    )
}