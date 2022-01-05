import React from "react";
import Split from "react-split";
import {nanoid} from "nanoid";
import Sidebar from "./Components/Sidebar/Sidebar";
import Editor from "./Components/Editor/Editor";
import "./App.css"

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
    console.log(notes)
  }

  function updateNote(bodytext) {
    setNotes(oldNotes => {
      const newNotesArray = []
      for(let i=0; i < oldNotes.length; i++) {
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

  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  return (
    <div className="App">
      {
        notes.length > 0
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
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {
            currentNoteId 
            && notes.length > 0 
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
              Create new note
          </button>
        </div>
      }
    </div>
  );
}
