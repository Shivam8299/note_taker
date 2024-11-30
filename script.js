// Elements
const themeToggle = document.getElementById('theme-toggle');
const addNoteButton = document.getElementById('add-note');
const notesContainer = document.getElementById('notes-container');

// Theme Toggle: Toggle dark/light mode and save to localStorage
themeToggle.addEventListener('click', () => {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Restore Theme Preference: Check localStorage for theme preference
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// Add Note Button Click: Trigger adding a new note
addNoteButton.addEventListener('click', () => addNewNote());

// Load Notes on DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadNotes);

// Function to create a new note
function addNewNote(content = '') {
  const note = document.createElement('div');
  note.classList.add('note');
  
  note.innerHTML = `
    <textarea placeholder="Start typing...">${content}</textarea>
    <div class="note-buttons">
      <button class="save-btn">Save</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;
  
  // Event listeners for text change
  const textarea = note.querySelector('textarea');
  textarea.addEventListener('input', () => updateButtonText(note));

  // Save and Delete event listeners
  note.querySelector('.save-btn').addEventListener('click', () => saveNotes());
  note.querySelector('.delete-btn').addEventListener('click', () => deleteNote(note));

  notesContainer.appendChild(note);
}

// Function to update the button text when the user types
function updateButtonText(note) {
  const saveButton = note.querySelector('.save-btn');
  const textarea = note.querySelector('textarea');
  
  if (textarea.value.trim().length > 0) {
    saveButton.textContent = 'tap to save';  // Button text after typing
  } else {
    saveButton.textContent = 'Saved';
  }
}

// Function to save all notes to localStorage
function saveNotes() {
  const notes = Array.from(document.querySelectorAll('.note textarea')).map(
    (textarea) => textarea.value
  );
  localStorage.setItem('notes', JSON.stringify(notes));
  showSaveMessage();
}

// Function to delete a specific note and update storage
function deleteNote(note) {
  note.remove();
  // saveNotes();
}

// Function to load notes from localStorage and display them
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach((content) => addNewNote(content));
}

// Function to display a "Note saved successfully!" message
function showSaveMessage() {
  const message = document.createElement('div');
  message.classList.add('save-message');
  message.textContent = 'Note saved successfully!';
  
  document.body.appendChild(message);

  // Remove the message after 3 seconds
  setTimeout(() => {
    message.remove();
  }, 6000);
}


