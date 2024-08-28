import React, { useState, useEffect } from "react";
import './allCashGifts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function AllCashGifts(){
    let navigate = useNavigate();
    const [cashGifts, setCashGifts] = useState([]);

    function handleGoback(){
        navigate('/menu')
    }

    useEffect (()=>{
      let token = localStorage.getItem("token");
      let headerString = 'Bearer ' + token;
      fetch('http://localhost:8080/api/v1/cashGifts', {
        method: 'GET',
        headers: {
            'Authorisation': headerString
        },
      })
        .then(response => {
          if(!response.ok){
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data=>{
          setCashGifts(data)
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
        <div>
          CashGifts:
          {cashGifts.length > 0?(
            <ul>
              {cashGifts.map((gift,index)=>(
                <li key={index}>Name: {gift.name} Amount: {gift.amount}</li>
              ))}
            </ul>
          ):<p>Loading cashgifts.......</p>}
        </div>
        <div id="button">
          <button onClick={handleGoback} className="btn btn-primary">Go back</button>
        </div>
        
        
      </div>
    </div>
    )
}