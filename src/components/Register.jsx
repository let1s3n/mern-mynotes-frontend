import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import HOME_URL from '../config'  
const Login = () => {

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  useEffect(() => {

  }, []);

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }


  const onSubmit = async e => {
    e.preventDefault();
    const register = await axios.post(`${HOME_URL}api/auth/signup`, {
      username,
      email,
      password


    });

    const token = register.data.token;
    const _username = register.data.username;
    const roles = register.data.roles;

    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('username', _username);
    window.sessionStorage.setItem('roles', JSON.stringify(roles));

    /* setUserName(''); */
    window.location.href = '/home';

  }
  return (
    <div className="mt-5">
      <form onSubmit={onSubmit}>

        <div className="row justify-content-center">
          <div className="col-2">
            <label for="usernameInput" className="form-label">Username</label>
          </div>
          <div className="col-4 mb-3">
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              onChange={onChangeUserName}
              value={username}
            />
          </div>

        </div>
        <div className="row justify-content-center">
          <div className="col-2">
            <label for="EmailInput" className="form-label">Email</label>
          </div>
          <div className="col-4 mb-3">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              onChange={onChangeEmail}
              value={email}
            />
          </div>
        </div>



        <div className="row justify-content-center">
          <div className="col-2">
            <label for="passwordInput" className="form-label">Password</label>
          </div>
          <div className="col-4 mb-3">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              onChange={onChangePassword}
              value={password}
            />
          </div>
        </div>


        <div className="row justify-content-center">
          <div className="col-6 mb-3">
            <button type="submit" className="btn btn-primary">Sign up</button>
          </div>
        </div>

      </form>
      <p className="text-center mt-3">Or If you already have an account just login <Link to="/login">here</Link>  </p>
    </div>

  )
}

export default Login;
