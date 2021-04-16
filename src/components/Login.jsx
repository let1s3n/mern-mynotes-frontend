import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import {axios_instance} from '../config'

const Login = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  

  useEffect(() => {

  }, []);

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(API_URL);
    const login = await axios_instance.post(`api/auth/signin`, {
      username: username,
      password: password
    });
    const token = login.data.token;
    const _username = login.data.username;
    const roles = login.data.roles;

    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('username', _username);
    window.sessionStorage.setItem('roles', JSON.stringify(roles));

    window.location.href = '/home';
  }
  return (
    <div className="mt-5">
      <form onSubmit={onSubmit}>

        <div className="row justify-content-center">
          <div className="col-2">
            <label htmlFor="usernameInput" className="form-label">Username</label>
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
            <label htmlFor="passwordInput" className="form-label">Password</label>
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
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
        </div>

      </form>
      <p className="text-center mt-3">Or <Link to="/register">Sign up</Link> </p>
    </div>

  )
}

export default Login;
