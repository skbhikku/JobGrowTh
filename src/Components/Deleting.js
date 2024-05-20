// Deleting.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Deleting() {
    const [questions, setQuestions] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');
    const [categoryToDelete, setCategoryToDelete] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = [
        'C Language',
        'C Plus Language',
        'Java',
        'Python',
        'HTML',
        'CSS',
        'JavaScript',
        'SQL',
        'Swift',
        'Data Structure',
        'Django',
        'React Js'
    ];

    useEffect(() => {
        fetchQuestions();
    }, [deleted]);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`/api/questions?category=${categoryToDelete}`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions', error);
        }
    };
    const handleDeleteQuestion = async () => {
        try {
            await axios.delete(`/api/deleteQuestion/${idToDelete}?category=${categoryToDelete}`);
            setDeleted(!deleted);
            alert('Question deleted successfully');
        } catch (error) {
            console.error('Error deleting question', error);
            alert('Error deleting question');
        }
    };

    const handleCategoryChange = (value) => {
        const formattedCategory = value.toLowerCase().replace(/\s+/g, '');
        setCategoryToDelete(formattedCategory);
        setSelectedCategory(value);
    };

    return (
        <>
        <Navbar></Navbar>
        <h4>Deleting Questions</h4>
        <div className={`text-center mb-3 container`} style={{ margin: '20px 10%', padding: '0', marginTop: '100px' }}>
            <div>
                <input 
                    type="text" 
                    value={idToDelete} 
                    onChange={(e) => setIdToDelete(e.target.value)} 
                    placeholder="Enter ID to delete" 
                />
                <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} style={{backgroundColor:'#000000' ,color:'lightblue'}}>
                    <option value="">Select category</option>
                    {categories.map((categoryName, index) => (
                        <option key={index} value={categoryName}>{categoryName}</option>
                    ))}
                </select>
                <button onClick={handleDeleteQuestion}>Delete</button>
            </div>
        </div>
        <h4>Delete the user from database</h4>
        </>
    );
}

export default Deleting;
