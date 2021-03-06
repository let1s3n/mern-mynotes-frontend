import React, { useState, useEffect } from 'react'

import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import {axios_instance} from '../config'

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const res = await axios_instance.get(`api/notes`, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.token
      }
    });
    setNotes(res.data);
  }

  useEffect(() => {
    getNotes();
  }, []);


  const deleteNote = async id => {
    await axios_instance.delete(`api/notes/` + id, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.token
      }
    });
    getNotes();
  }
  return (
    <div className="row">
      {
        notes.map(note =>
          <div className="col-md-4 p-2" key={note._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>{note.title}</h5>

                <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                  Edit
                </Link>
              </div>
              <div className="card-body">
                <p>{note.content}</p>
                <p>{note.author}</p>
                <p>{format(note.date)}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-danger" onClick={() => deleteNote(note._id)}>Delete</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default NotesList
