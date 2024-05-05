import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    function handleChange(event){
        const {id, value} = event.target;
        if (id === 'username'){
            setUsername(value);
        } else if (id === 'password'){
            setPassword(value);
        }
    }

    function handleSubmit(event){
        event.preventDefault();

        fetch('http://localhost:8080/api/v1/cashGifts/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Register successful:', data);
            // add page redirecting here
        })
        .catch(error => {
            console.error('Error during register:', error);
        })
    }

    function returnLogin(){
      navigate('/login');
    }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
        <div className="display-4 mb-4 ">
            Register
        </div>
      <form className="w-25" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="username" className="form-control" id="username" value={username} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={handleChange}/>
        </div>
        <div className='d-flex justify-content-center'>
          <button type="submit" className="btn btn-primary">Create account</button>
          <button className='btn btn-primary ms-5' onClick={returnLogin}>Back to Login</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
