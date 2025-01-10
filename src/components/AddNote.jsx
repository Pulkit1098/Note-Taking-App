import React, {useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";

function AddNote(props) {

    const context = useContext(noteContext);
    const {addnote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"})

    const handleClick = (e)=>{
        e.preventDefault();
        addnote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: "default"})
        props.showAlert("Note Added Successfully", "success")
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <div className="container my-3">
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
          onChange={onChange}
            value={note.title}
            minLength={3} required
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
          onChange={onChange}
          value={note.description}
          minLength={5} required
            type="text"
            className="form-control"
            id="description"
            name="description"
          />
        </div>
        <button disabled={note.title.length<3 || note.description.length<5} onClick={handleClick} type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
    </div>
  )
}

export default AddNote
