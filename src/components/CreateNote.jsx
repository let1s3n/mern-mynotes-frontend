import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import API_URL from '../config'

const CreateNote = (props) => {

  const [user, setUser] = useState('');
  const [state, setState] = useState({
    userSelected: user,
    title: '',
    content: ''
  });

  const [date, setDate] = useState(new Date());

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState('');

  const getUser = async () => {
    const res = await axios.get(`${API_URL}api/users`, {
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
      }
    });
    const currentUser = res.data.filter(user => user.username === window.sessionStorage.getItem('username'))[0].username;
    setUser(currentUser);
    /* console.log(props.match.params.id) */
    /* setUser(props.match.params.id); */
  }

  const checkEditing = async () => {
    if (window.location.href === '/edit/' + props.match.params.id) {
      const res = await axios.get(`${API_URL}api/notes/` + props.match.params.id);
      /* console.log(res.data); */
      const { title, content, date, author } = res.data;
      setState(
        {
          title,
          content,
          userSelected: author
        }
      );
      setDate(new Date(date));
      setEditing(true);
      setId(props.match.params.id);

    }
  }

  useEffect(() => {
    getUser();
    checkEditing();
  }, []);

  /* useEffect(() => {
    setState(s =>
      ({ ...s, userSelected: user })
    );
  }, [users]); */

  const onSubmit = async e => {
    e.preventDefault();
    const { userSelected, title, content } = state;

    const newNote = {
      author: userSelected,
      title,
      content,
      date: date
    };

    if (editing) {
      await axios.put(`${API_URL}api/notes/` + id, newNote, {
        headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
        }
      });
    } else {
      /* console.log(window.localStorage.getItem('token')) */
      await axios.post(`${API_URL}api/notes`, newNote, {
        headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
        }
      });
    }


    window.location.href = "/notesList";

  }

  const onInputChange = e => {
    setState(
      { ...state, [e.target.name]: e.target.value }
    );
  }

  /* const onChangeDate = date => {
    setDate(date);
  } */
  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>Create Note</h4>
        {/* SELECT USER */}
        <div className="mb-3">
          {/* <select
            className="form-control"
            name="userSelected"
            onChange={onInputChange}
            value={state.userSelected}
          >
            {
              users.map(user =>
                <option key={user} value={user}>
                  {user}
                </option>)
            }
          </select> */}

          <input
            readOnly
            disabled
            type="text"
            value={user}

          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            required
            onChange={onInputChange}
            value={state.title}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="content"
            className="form-control"
            placeholder="Content"
            required
            onChange={onInputChange}
            value={state.content}
          ></textarea>
        </div>
        <div className="mb-3">
          <DatePicker
            className="form-control"
            selected={date}
            onChange={date => setDate(date)}

          />
        </div>


        <form onSubmit={onSubmit}>

          <button type="submit" className="btn btn-primary">
            Save
        </button>
        </form>
      </div>
    </div>
  )
}

export default CreateNote
