import React from 'react';
import { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

        fetch('http://localhost:8080/api/v1/cashGifts/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Login successful:', data);
            // add page redirecting here
        })
        .catch(error => {
            console.error('Error during login:', error);
        })
    }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form className="w-25" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="username" className="form-control" id="username" value={username} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  );
}

export default Login;
