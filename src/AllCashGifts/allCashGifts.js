import React, { useState, useEffect } from "react";
import './allCashGifts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function AllCashGifts(){
    let navigate = useNavigate();
    const [cashGifts, setCashGifts] = useState({});

    function handleGoback(){
        navigate('/menu')
    }

    useEffect (()=>{
      fetch('http://localhost:8080/api/v1/cashGifts')
        .then(Response => {
          if(!Response.ok){
            throw new Error('Network response was not ok');
          }
          return Response.json();
        })
        .then(data=>{
          setCashGifts(data)
          console.log(cashGifts)
        })
        .catch(error => {
          console.error("There was a nerror fetching the cash gifts", error);
        })
    },[])
    

    return(
    <div className="main-page d-flex container-fluid justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="text-center">
        <div className="display-4 text-primary">
          All Cash Gifts
        </div>
        
        <div id="button">
          <button onClick={handleGoback} className="btn btn-primary">Go back</button>
        </div>
        
        
      </div>
    </div>
    )
}