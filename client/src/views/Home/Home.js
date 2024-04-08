import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import NoteCard from './../../components/NoteCard/NoteCard';

function Home() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadNotes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
            setNotes(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading notes:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotes();
    }, []);

    return (
        <div className="home-container">
            <h1 className='app-header'>All Notes</h1>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="notes-container">
                    {notes.map((note) => (
                        <NoteCard key={note._id} {...note} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
