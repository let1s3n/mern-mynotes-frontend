import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../config'
const CreateUser = () => {

  const [users, setUsers] = useState([]);
  const [newUserInfo, setNewUserInfo] = useState({
    username: '',
    email: '',
    password: ''
  });

  const getUsers = async () => {
    const res = await axios.get(`${API_URL}api/users`, {
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
      }
    });
    setUsers(res.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const onChangeUserInfo = (e) => {
    setNewUserInfo(
      { ...newUserInfo, [e.target.name]: e.target.value }

    );
  }



  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(`${API_URL}api/users`, newUserInfo, {
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
      }
    });
    setNewUserInfo({
      username: '',
      email: '',
      password: ''
    });
    getUsers();

  }

  const deleteUser = async (id) => {
    await axios.delete(`${API_URL}api/users/` + id, {
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
      }
    });
    getUsers();
  }


  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
          <h3>Create New User</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                onChange={onChangeUserInfo}
                name='username'
                value={newUserInfo.username}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                onChange={onChangeUserInfo}
                name='email'
                value={newUserInfo.email}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                onChange={onChangeUserInfo}
                name='password'
                value={newUserInfo.password}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <ul className="list-group">
          {
            users.map(user => <li
              key={user._id}
              className="list-group-item list-group-item-action"
              onDoubleClick={() => deleteUser(user._id)}
            >
              {user.username}
            </li>)
          }
        </ul>
      </div>
    </div>
  )
}

export default CreateUser
