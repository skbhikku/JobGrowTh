import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Questions() {
    const [questionText, setQuestionText] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [category, setCategory] = useState('');
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

    const handleAddQuestion = async () => {
        try {
            await axios.post('/api/addQuestion', { questionText, answerText, category });
            setQuestionText('');
            setAnswerText('');
            setSelectedCategory(category);
            setCategory('');
            alert('Question added successfully');
        } catch (error) {
            console.error('Error adding question', error);
            alert('Error adding question');
        }
    };

    const handleCategoryChange = (value) => {
        const formattedCategory = value.toLowerCase().replace(/\s+/g, '');
        setCategory(formattedCategory);
        setSelectedCategory(value);
    };

    return (
        <>
        <Navbar></Navbar>
        <div className="container " style={{display:'block'}}>
        <div style={{marginTop:'100px'}}>
            <textarea type="text" style={{backgroundColor:'#000000' ,color:'white'}} value={questionText} onChange={(e) => setQuestionText(e.target.value)} placeholder="Enter question text"/>
            <textarea type="text" style={{backgroundColor:'#000000' ,color:'lightblue'}} value={answerText} onChange={(e) => setAnswerText(e.target.value)} placeholder="Enter answer text"/>
            <select className='text-center' value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} style={{backgroundColor:'#000000' ,color:'lightblue'}}>
                <option value="">Select category</option>
                {categories.map((categoryName, index) => (
                    <option key={index} value={categoryName}>{categoryName}</option>
                ))}
            </select>
            <button onClick={handleAddQuestion}>Add Question</button>
        </div>
        </div>
        </>
    );
}

export default Questions;
