import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
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

        // const base64Credentials = btoa(username + ':' + password);

        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        })
        .then(response => {
          if(response.ok){
            return response.json();
          } else {
            throw new Error('Failed to login');
          }
        })
        .then(data => {
          if(data.token){
            // store jwt into localstorage
            localStorage.setItem('token',data.token);
            console.log('Login successful:', data);
            navigate('/menu')
          }else{
            console.error('No token found in response');
          }
            
        })
        .catch(error => {
            console.error('Error during login:', error);
        })
    }

    function handleRegisterRedirect(){
      navigate('/register')
    }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <div className="display-4 mb-4 ">
        Login
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
          <button type="submit" className="btn btn-primary me-3">Log In</button>
          <button onClick={handleRegisterRedirect} className='btn btn-primary'>Register</button>
        </div>
        
      </form>
    </div>
  );
}

export default Login;
