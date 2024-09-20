import React, { useState, useEffect } from "react";
import './allCashGifts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { json, useNavigate } from 'react-router-dom';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Box } from "@chakra-ui/react";
import { header } from "framer-motion/client";

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
    
    // The following code is for creating table
    const columns = [
      {
        header: "Name",
        accessorKey: "name",
        size: 200,
      },
      {
        header: "Amount",
        accessorKey: "amount",
        size: 150,
      }
    ];


    const table = useReactTable({
      columns,
      data: cashGifts.length > 0?cashGifts:[],
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
    
    console.log(table.getHeaderGroups());

    return(
      // This is the previous code
    // <div className="main-page d-flex container-fluid justify-content-center align-items-center" style={{ height: "100vh" }}>
    //   <div className="text-center">
    //     <div className="display-4 text-primary">
    //       All Cash Gifts
    //     </div>
    //     <div>
    //       CashGifts:
    //       {cashGifts.length > 0?(
    //         <ul>
    //           {cashGifts.map((gift,index)=>(
    //             <li key={index}>Name: {gift.name} Amount: {gift.amount}</li>
    //           ))}
    //         </ul>
    //       ):<p>Loading cashgifts.......</p>}
    //     </div>
    //     <div id="button">
    //       <button onClick={handleGoback} className="btn btn-primary">Go back</button>
    //     </div>
        
        
    //   </div>
    // </div>

    <div className="main-page d-flex container-fluid justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="text-center">
        <div className="display-4 text-primary" id="title">
          All Cash Gifts
        </div>
        
        <table className="table table-hover table-primary">
          {table.getHeaderGroups().map(headerGroup => (
            <thead>
              <tr>
                {headerGroup.headers.map(column => (
                  <th key={column.id} style={{width: `${column.column.columnDef.size}px`}}>{column.column.columnDef.header}</th>
                ))}
              </tr>
            </thead>
          ))}

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} style={{ width: `${cell.column.columnDef.size}px` }}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pageButtons">
          <button onClick={() => table.setPageIndex(0)} className="btn btn-primary page-btn">First Page</button>
          <button onClick={() => table.previousPage()} className="btn btn-primary page-btn">Previous Page</button>
          <button onClick={() => table.nextPage()} className="btn btn-primary page-btn">Next Page</button>
        </div>

        <div id="button">
          <button onClick={handleGoback} className="btn btn-primary">Go back</button>
        </div>
        
        
      </div>
    </div>

    )
}