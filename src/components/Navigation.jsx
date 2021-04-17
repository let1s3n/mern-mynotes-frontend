import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const checkRole = (roles) => {
  if (roles) {
    for (let role of roles) {
      if (role['name'] === 'moderator') {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
}

const isLogged = (token) => {
  if (token) {
    return true;
  }
  return false;
}

const Navigation = () => {
  const [logged, setLogged] = useState(false);
  const [credentials, setCredentials] = useState(false);



  useEffect(() => {
    const roles = JSON.parse(sessionStorage.getItem('roles'));
    setLogged(isLogged(sessionStorage.token));
    setCredentials(checkRole(roles));

  }, []);



  const initialNav =
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
    </Link>
      </li>
    </ul>;

  const userNav =
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/notesList">
          Notes List
    </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/create">
          Create Note
          </Link>
      </li>
    </ul>;

  const adminNav =
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/notesList">
          Notes List
    </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/create">
          Create Note
          </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/users">
          Create Users
          </Link>
      </li>
    </ul>;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/home">
          NotesApp
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* {logged
            ? (credentials
              ? adminNav
              : userNav)
            : initialNav} */}
            {adminNav}
        </div>

      </div>
    </nav>
  )
}

export default Navigation
