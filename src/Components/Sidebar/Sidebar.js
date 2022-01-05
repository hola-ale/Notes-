import React from "react";

export default function Sidebar(props) {
    const noteElement = props.notes.map(note => (
        <div key={note.id}>
            <div className={`title ${note.id === props.currentNoteId ? "selected-note" : ""}`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="sidebar--panel">
            <div className="sidebar--header">
                <h3>Your notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}