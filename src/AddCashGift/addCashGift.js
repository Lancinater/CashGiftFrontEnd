import React, { useState, useEffect } from "react";
import './addCashGift.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function AddCashGift(){
    let navigate = useNavigate();

    function handleGoback(){
        navigate('/menu')
    }

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');


    function handleChange(event){
        const {id, value} = event.target;
        if (id === 'name'){
            setName(value);
        } else if (id === 'amount'){
            setAmount(value);
        }
    }

    function handleSubmit(event){
      event.preventDefault();

      
        let token = localStorage.getItem("token");
        let headerString = 'Bearer ' + token;
        console.log(headerString);
        console.log("start to add cashgift")
        fetch('http://localhost:8080/api/v1/cashGifts', {
          method: 'POST',
          headers: {
              'Authorisation': headerString,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            amount: amount
          })
        })
          .then(response => {
            if(!response.ok){
              throw new Error('Network response was not ok');
            }
            console.log("Cashgift has been successfully added")
            return response.json();
          })
          .catch(error => {
            console.error("There was a nerror fetching the cash gifts", error);
          })
      

    }

    return(
    <div className="main-page d-flex container-fluid justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="display-4 text-primary" id="title">
          Add Cash Gift
        </div>
        
        <form id="add-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" id="name" className="form-label display-6 text-primary">Name</label>
            <input type="name" className="form-control" id="name" value={name} onChange={handleChange} placeholder="Please enter the name"/>
          </div>
          <div className="mb-3">
            <label htmlFor="amount" id="amount" className="form-label display-6 text-primary">Amount</label>
            <input type="amount" className="form-control" id="amount" value={amount} onChange={handleChange} placeholder="Please enter the value"/>
          </div>
          <div id="add">
            <button type="submit" id="add-btn" className="btn btn-primary">Add Cashgift</button>
          </div>

          <div id="goback">
            <button onClick={handleGoback} className="btn btn-primary">Go back</button>
          </div>
        </form>

        
        
        
      </div>
    </div>
    )
}