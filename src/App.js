import React from "react";
import Split from "react-split";
import {nanoid} from "nanoid";
import Sidebar from "./Components/Sidebar/Sidebar";

export default function App() {
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  )
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "Your note goes here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(bodytext) {
    setNotes(oldNotes => {
      const newNotesArray = []
      for(let i=0; i < oldNotes.size; i++) {
        const oldNote = oldNotes[i]
        if(oldNote.id === currentNoteId) {
          newNotesArray.unshift({...oldNote, body: bodytext})
        } else {
          newNotesArray.push(oldNote)
        }
      }
      return newNotesArray
    })
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  return (
    <div className="App">
      {
        notes.size > 0
        ?
        <Split
          sizes={[30, 70]} 
          direction="horizontal" 
          className="split"
        >
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={newNote}
          />
          {
            currentNoteId 
            && notes.size > 0 
            && <Editor
              currentNote={findCurrentNote()}
              updateNote={updateNote}
            />
          }
        </Split>
        :
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button 
              className="first-note" 
              onClick={createNewNote}
          >
              Create one now
          </button>
        </div>
      }
    </div>
  );
}
