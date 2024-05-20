import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Webdevlop({ category, title }) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`/api/questionsinterview?category=${category}`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions', error);
            }
        };

        fetchQuestions();
    }, [category]);

    const splitAnswerText = (answer) => {
        // Split answer text at each dot and return an array
        return answer.split('●').map((part, index) => (
            <p key={index} className="card-text" style={{ margin: '0' }}>{part.trim()}</p>
        ));
    };

    return (
        <>
            <Navbar />
            <div className={`text mb-3 container my-500px`} style={{ marginTop: '100px' }}>
                <h2 className='text-center'>Top {title} Interview Questions and Answers</h2>
                {questions.map((question, index) => (
                    <div key={index} className="card text-red" style={{ background: 'rgb(218 191 252)', marginBottom: '20px' }}>
                        <div className="card-body">
                            <h5 className="card-title">{index + 1}) {question.question_text}?</h5>
                            <p style={{ margin: '0', padding: '0', color: 'green' }}>Answer)</p> {splitAnswerText(question.answer_text)}
                        </div>
                    </div>
                ))}
                {questions.length < 20 && (
                    <p className="text-center">More questions will be added soon</p>
                )}
            </div>
        </>
    );
}

export default Webdevlop;
