import React, {useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {

  const context = useContext(noteContext);
  const {deletenote} = context;

  const { note, updateNote } = props;
  return (
    <div className="col-md-4">
      <div className="card mx-1 my-2">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div className='d-flex'>
            <span onClick={()=>{updateNote(note)}} className="material-symbols-outlined mx-2" style={{cursor: "pointer"}}>edit</span>
            <span onClick={()=>{deletenote(note._id); props.showAlert("Note Deleted Successfully", "success")}} className="material-symbols-outlined mx-1" style={{cursor: "pointer"}}>delete</span>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
