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
    <div className="d-flex container-fluid justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="text-center">
        <div className="display-4 text-primary">
          Cash Gift Lookup
        </div>
        <div className='CashGiftOptions'>

          <div className="buttonRow">
            <div className="col-6">
              <button className="MenuButton btn btn-info">All Cash Gifts</button>
            </div>
            <div className="col-6">
              <button className="MenuButton btn btn-info">Find Cash Gifts</button>
            </div>
          </div>

          <div className="buttonRow">
            <div className="col-6">
              <button className="MenuButton btn btn-info">Add Cash Gift</button>
            </div>
            <div className="col-6">
              <button className="MenuButton btn btn-info">Remove Cash Gift</button>
            </div>
          </div>

        </div>
        <div id="button">
          <button onClick={handleGoback} className="btn btn-primary">Go back</button>
        </div>
        
        
      </div>
    </div>
    )
}