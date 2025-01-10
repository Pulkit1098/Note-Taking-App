import React, {useState, useContext, useEffect, useRef} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from './AddNote';
import {useNavigate} from 'react-router-dom';

function Notes(props) {

    const context = useContext(noteContext);
    const {notes, getNotes, editnote} = context;
    let navigate = useNavigate();

    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }
      else{
        navigate("/login")
      }
    }, [])

    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "default"})

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    const handleClick = (e)=>{
      editnote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      props.showAlert("Note Updated Successfully", "success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch demo modal
</button>

    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
          onChange={onChange}
            value={note.etitle}
            minLength={3} required
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
          onChange={onChange}
          value={note.edescription}
          minLength={5} required
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
          />
        </div>
      </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note)=>{
          return <Noteitem showAlert={props.showAlert} updateNote={updateNote} key={note._id} note={note}/>
        })}
      </div>
    </>
  )
}

export default Notes
