import React, { useState } from 'react'
import './NewNote.css'
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast'

function NewNote() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const addNote = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/notes`, {
        title: title,
        category: category,
        content: content
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error adding note:', error);
      alert('An error occurred while adding the note. Please try again later.');
    }
    setTitle('')
    setContent('')
    setCategory('')
    
  };

  return (
    <div>
      <h1 className='app-header'>NewNote</h1>

      <form className='form-new-note'>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className='input-title'
        />

        <select value={category} onChange={(e) => {
          setCategory(e.target.value);
        }} className='input-category'>
          <option value='select category'>Select Category</option>
          <option value='general'>General</option>
          <option value='work'>Work</option>
          <option value='personal'>Personal</option>
          <option value='learning'>Learning</option>
          <option value='other'>Other</option>
        </select>

        <input
          type='text'
          placeholder='Content'
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className='input-content'
        />

        <button type='button' onClick={addNote} className='button-save'>Save</button>

      </form>
    </div>
  )
}

export default NewNote;
