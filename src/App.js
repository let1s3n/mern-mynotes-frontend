import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Login from './components/Login'
import Navigation from './components/Navigation'
import NotesList from './components/NotesList'
import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'
import Register from './components/Register'
import Home from './components/Home'

const checkRole = (roles) => {
  if (roles) {
    for (let role of roles) {
      if (role.name === 'moderator') {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
}

function App() {
  const roles = JSON.parse(sessionStorage.getItem('roles'));
  let isModerator = checkRole(roles);

  const unauthenticatedNav = <div className="container p-4">
    <Route exact path="/" component={Login} />
    <Route path="/register" component={Register} />

  </div>;

  const authenticatedNav = <div className="container p-4">
    <Route path="/home" component={Home} />
    <Route path="/notesList" component={NotesList} />
    <Route path="/create" component={CreateNote} />
    {/* <Route path="/create/:id" component={CreateNote} /> */}
    <Route path="/edit/:id" component={CreateNote} />

  </div>;

  const moderatorNav = <div className="container p-4">
    <Route path="/home" component={Home} />
    <Route path="/notesList" component={NotesList} />
    <Route path="/create" component={CreateNote} />
    <Route path="/edit/:id" component={CreateNote} />
    <Route path="/users" component={CreateUser} />
  </div>;





  return (
    <Router>
      <Navigation />

      {/* {sessionStorage.getItem('token')

        ? isModerator ? moderatorNav : authenticatedNav

        : unauthenticatedNav} */}


      {moderatorNav}

    </Router>
  );
}

export default App;
