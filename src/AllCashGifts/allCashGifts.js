import React, { useState, useEffect } from "react";
import './allCashGifts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { json, useNavigate } from 'react-router-dom';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Box } from "@chakra-ui/react";
import { header, style } from "framer-motion/client";

export default function AllCashGifts(){
    let navigate = useNavigate();
    const [cashGifts, setCashGifts] = useState([]);

    // sorting the cashgifts
    const [sorting, setSorting] = useState([]);

    // filtering the cashgifts
    const [filtering, setFiltering] = useState('');

    function handleGoback(){
        navigate('/menu')
    }

    function handleReturn(name){
      let token = localStorage.getItem("token");
      let headerString = 'Bearer ' + token;

      fetch(`http://localhost:8080/api/v1/cashGifts/return/${name}`, {
        method: 'PUT',
        headers: {
          'Authorization': headerString
        }
      })
      .then(response => {
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        console.log("Cash gift returned successfully");
        return response.json();
      })
      .then(updatedGift => {
        console.log("The updated gift is ", updatedGift);
        let newCashGifts = cashGifts.map(gift => {
          if(gift.name === updatedGift.name){
            return updatedGift;
          }
          return gift;
        })
        setCashGifts(newCashGifts);
      }
      )
      .catch(error => {
        console.error("There was an error returning the cash gift", error);
      })
    }

    function handleDelete(name){
      let token = localStorage.getItem("token");
      let headerString = 'Bearer ' + token;

      fetch(`http://localhost:8080/api/v1/cashGifts/${name}`, {
        method: 'DELETE',
        headers: {
          'Authorization': headerString
        }
      })
      .then(response => {
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        setCashGifts(cashGifts.filter(gift => gift.name !== name));
        console.log("Cash gift deleted successfully");
      })
      .catch(error => {
        console.error("There was an error deleting the cash gift", error);
      })
    }


    useEffect (()=>{
      let token = localStorage.getItem("token");
      let headerString = 'Bearer ' + token;
      fetch(`http://localhost:8080/api/v1/cashGifts`, {
        method: 'GET',
        headers: {
            'Authorization': headerString
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
      },
      {
        header: "Returned",
        accessorKey: "isReturned",
        size: 150,
      },
      {
        header: "Manage",
        size: 150,
        cell: ({ row }) => (
          <Box>
            <button className="btn btn-success" 
            onClick={() => handleReturn(row.original.name)}
            style={{
              marginRight: '10px',
              width: '100px'
            }}>Returned</button>
            <button className="btn btn-danger" 
            onClick={() => handleDelete(row.original.name)}
            style={
              {
                width: '100px',
                marginLeft: '10px'
              }
            }>Delete</button>
          </Box>
        ),
      }
    ];


    const table = useReactTable({
      columns,
      data: cashGifts.length > 0?cashGifts:[],
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting: sorting,
        globalFilter: filtering,
      },
      onSortingChange: setSorting,
      onFilteringChange: setFiltering,
    });

    return(

    <div className="main-page d-flex container-fluid justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="text-center">
        <div className="display-4 text-primary" id="title">
          All Cash Gifts
        </div>

        <div className="table-wrapper" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            style={{marginBottom: '10px',
            width: '50%'
            }}
          />
          <table className="table table-hover table-primary">
            {table.getHeaderGroups().map(headerGroup => (
              <thead key={headerGroup.id}>
                <tr>
                  {headerGroup.headers.map(column => (
                    <th id="headerElement" key={column.id} style={{width: `${column.column.columnDef.size}px`}} onClick={column.column.getToggleSortingHandler()}>
                      {column.column.columnDef.header}
                      {
                        {asc: '↑', desc: '↓'}[column.column.getIsSorted() ?? null]
                      }
                    </th>
                  
                  ))}
                </tr>
              </thead>
            ))}

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} style={{ width: `${cell.column.columnDef.size}px` }}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="pageIndex">  
            <p>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</p>
          </div>

          <div className="pageButtons">
            <button onClick={() => table.setPageIndex(0)} className="btn btn-primary page-btn">First Page</button>
            <button onClick={() => table.previousPage()} className="btn btn-primary page-btn">Previous Page</button>
            <button onClick={() => table.nextPage()} className="btn btn-primary page-btn" disabled={table.getState().pagination.pageIndex + 1 >= table.getPageCount()} >Next Page</button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="btn btn-primary page-btn">Last Page</button>
          </div>

          <div id="button">
            <button onClick={handleGoback} className="btn btn-primary" style={{width: '200px', marginBottom: '30px'}}>Go back</button>
          </div>
        </div>
      </div>
    </div>

    )
}