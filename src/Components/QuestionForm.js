import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function QuestionForm() {
  const [formData, setFormData] = useState({
    question: '',
    codeSnippet: '',
    options: ['', '', '', ''],
    answer: '',
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'options') {
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({ ...formData, [name]: newOptions });
    } else if (name === 'answer' && /^[0-4]$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    } else if (name !== 'answer') {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithAnswerAsNumber = { ...formData, answer: parseInt(formData.answer, 10) };
      await axios.post('/api/questionsadd', formDataWithAnswerAsNumber);
      alert('Question added successfully!');
      setFormData({
        question:'',
        codeSnippet:'',
        options:['','','',''],
        answer:'',
      })
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while adding question!');
    }
  };

  const handleClearData = async () => {
    try {
      await axios.post('/api/clearQuestions');
      alert('All questions cleared successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while clearing questions!');
    }
  };

  const handleClearUserData = async () => {
    try {
      await axios.post('/api/clearUserData');
      alert('All user quiz data cleared successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while clearing user data!');
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className='container' style={{marginTop:'100px'}}>
    <form onSubmit={handleSubmit}>
      <div style={{margin:'20px'}}>
      <label style={{margin:'40px',marginLeft:'0px'}}>
        Question:
        <input type="text" name="question" value={formData.question} onChange={(e) => handleChange(e)} style={{width:'1000px'}}  />
      </label>
      <label>
        Code Snippet:
        <textarea name="codeSnippet" value={formData.codeSnippet} onChange={(e) => handleChange(e)} rows={10} cols={120}/>
      </label>
      {[0, 1, 2, 3].map((index) => (
        <label key={index} style={{marginLeft:'20px',marginTop:'10px'}}>
          Option {index + 1}:
          <input
            type="text"
            name="options"
            value={formData.options[index]}
            onChange={(e) => handleChange(e, index)}
          />
        </label>
      ))}
      <label style={{marginTop:'10px'}}>
        Correct Answer:
        <input
          type="text"
          name="answer"
          value={formData.answer}
          onChange={(e) => handleChange(e)}
          maxLength={1}
        />
      </label>
      </div>
      <button className='btn btn-primary' type="submit" style={{marginLeft:'40%'}}>Submit</button>

      <div className='container' style={{marginTop:'10px',marginLeft:'30%'}}>
      <h3>Clear data from Questions.json</h3>
      <button className='btn btn-primary' type="button" onClick={handleClearData}>Clear Data</button>
     
      </div>
      <div style={{marginLeft:'30%'}}>
      <h3 style={{marginTop:'30px'}}>Clear data from User Table</h3>
      <button type="button" className='btn btn-primary' onClick={handleClearUserData} >Clear User Data</button>
      </div>
    </form>
    </div>
    </>
  );
}

export default QuestionForm;
