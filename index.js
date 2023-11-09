const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

getNote().forEach((note) => {
  const noteEl = createNoteEl(note.id,note.content);
  appEl.insertBefore(noteEl,btnEl);
})

function createNoteEl(id,content){
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty note";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note ?");
    if(warning){
      deleteNote(id,element);
    }
  });

  element.addEventListener("input", () => {
    updateNote(id,element.value)
  });

  return element;
}

function updateNote(id,content){
  const Notes = getNote();
  const target = Notes.filter((Note) => Note.id == id)[0];
  target.content = content;
  saveNotes(Notes);
}

function deleteNote(id,element){
  const Notes = getNote();
  const newNotes = Notes.filter((NewNote) => NewNote.id != id );
  saveNotes(newNotes);
  appEl.removeChild(element);
}


function addNote(){
  const notes = getNote();

  const note_OBJ = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteEl(note_OBJ.id,note_OBJ.content);
  appEl.insertBefore(noteEl, btnEl);
  notes.push(note_OBJ);
  saveNotes(notes);
}


function saveNotes(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNote() {
  return JSON.parse(localStorage.getItem("note-app",) || "[]")
}

btnEl.addEventListener("click", addNote);