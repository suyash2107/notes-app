import React from 'react';
import './NoteCard.css';
import DeleteIcon from './deletebtn.png';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast'

function NoteCard({_id, title, content, category, loadNotes}) {
  const deleteNote = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${_id}`);
      toast.success(response.data.message);
      
      if (loadNotes) {
        loadNotes();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('An error occurred while deleting the note. Please try again later.');
    }
  };

  return (
    <div className='note-card'>
      <h3>{title}</h3>
      <p>{content}</p>
      <span className='note-card-category'>{category}</span>
      <img
        src={DeleteIcon}
        className='Delete-icon'
        alt='Delete Icon'
        onClick={deleteNote}
      />
    </div>
  );
}

export default NoteCard;
