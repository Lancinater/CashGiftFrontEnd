import React from "react";
import './addCashGift.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function AddCashGift(){
    let navigate = useNavigate();

    function handleGoback(){
        navigate('/menu')
    }

    return(
    <div className="main-page d-flex container-fluid justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="text-center">
        <div className="display-4 text-primary">
          Add Cash Gift
        </div>
        
        <div id="button">
          <button onClick={handleGoback} className="btn btn-primary">Go back</button>
        </div>
        
        
      </div>
    </div>
    )
}