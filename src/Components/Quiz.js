import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import QuizResult from './QuizResult';
import './QuizCss.css';
import Navbar from './Navbar';
import { UserContext } from './UserContext';
import questionsData from './Questions.json'; // Import JSON data
import { Link } from 'react-router-dom';


function Quiz() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const { userEmail } = useContext(UserContext);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [optionClicked, setOptionClicked] = useState(false);
    const [isThursday, setIsThursday] = useState(false);
    const [previousScore, setPreviousScore] = useState(null);
    const [navbarLocked, setNavbarLocked] = useState(false);

    useEffect(() => {
        const today = new Date().getDay();
        setIsThursday(today === 0); // 4 represents Thursday

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const checkEmail = async () => {
            try {
                const response = await axios.post('/api/checkEmail', { email: userEmail });
                const { exists, score } = response.data;
                if (exists) {
                    setQuizCompleted(true);
                    setPreviousScore(score);
                }
            } catch (error) {
                console.error('Error checking email:', error);
            }
        };

        checkEmail();
    }, [userEmail]);

    useEffect(() => {
        if (showResult && !quizCompleted) {
            const submitScore = async () => {
                try {
                    await axios.post('/api/submitScore', { email: userEmail, score });
                    setQuizCompleted(true);
                } catch (error) {
                    console.error('Error submitting score:', error);
                }
            };

            submitScore();
        }
    }, [showResult, quizCompleted, userEmail, score]);

    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem('quizState'));
        if (savedState) {
            setQuizStarted(savedState.quizStarted);
            setCurrentQuestion(savedState.currentQuestion);
            setScore(savedState.score);
            setClickedOption(savedState.clickedOption);
            setShowResult(savedState.showResult);
            setQuizCompleted(savedState.quizCompleted);
            setFeedback(savedState.feedback);
            setCorrectAnswer(savedState.correctAnswer);
            setOptionClicked(savedState.optionClicked);
            setNavbarLocked(savedState.navbarLocked);
        }
    }, []);

    useEffect(() => {
        const quizState = {
            quizStarted,
            currentQuestion,
            score,
            clickedOption,
            showResult,
            quizCompleted,
            feedback,
            correctAnswer,
            optionClicked,
            navbarLocked,
        };
        localStorage.setItem('quizState', JSON.stringify(quizState));
    }, [quizStarted, currentQuestion, score, clickedOption, showResult, quizCompleted, feedback, correctAnswer, optionClicked, navbarLocked]);

    useEffect(() => {
        // Automatically submit the quiz if all questions have been answered
        if (quizStarted && currentQuestion === questionsData.length && !showResult) {
            setShowResult(true);
            setNavbarLocked(false);
        }
    }, [quizStarted, currentQuestion, showResult]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (quizStarted && !quizCompleted && !showResult) {
                setShowResult(true);
                setNavbarLocked(false);
                axios.post('/api/submitScore', { email: userEmail, score });
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [quizStarted, quizCompleted, showResult, userEmail, score]);

    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < questionsData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
            setFeedback(null);
            setCorrectAnswer(null);
            setOptionClicked(false);
        } else {
            setShowResult(true);
            setNavbarLocked(false); // Unlock the navbar after the quiz is completed
        }
    };

    const updateScore = () => {
        if (clickedOption === questionsData[currentQuestion].answer) {
            setScore(score + 1);
            setFeedback('correct');
        } else {
            setFeedback('wrong');
        }
    };

    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
        setQuizStarted(false);
        setCorrectAnswer(null);
        setNavbarLocked(false); // Unlock the navbar when the quiz is reset
        localStorage.removeItem('quizState');
    };

    const getWidth = () => {
        return windowWidth > 1200 ? 'null' : '350px';
    };

    const handleOptionClick = (optionIndex) => {
        if (!optionClicked) {
            setClickedOption(optionIndex);
            setCorrectAnswer(questionsData[currentQuestion].answer);
            setOptionClicked(true);
        }
    };

    const handleStartQuiz = () => {
        setQuizStarted(true);
        setNavbarLocked(true); // Lock the navbar when the quiz starts
    };

    const isEmptyQuestionsData = questionsData.length === 0;

    return (
        <>
            <Navbar className={navbarLocked ? 'navbar-locked' : ''} />
            <div>
                <p className="heading-txt">Quiz</p>
                <div className="quizcontainer" style={{ width: getWidth() }}>
                    {isEmptyQuestionsData ? (
                        <div className="note-points">
                            <h2>No questions available.</h2>
                            <p>Add Soon and Quiz will be available on <strong>Sunday</strong> only</p>
                        </div>
                    ) : !quizStarted ? (
                        <>
                            <div className='container text-center'>
                                <button className="start-btn" style={{ borderRadius: '10px', backgroundColor: 'grey', color: 'white' }} onClick={handleStartQuiz} disabled={!isThursday || quizCompleted}>
                                    Start Quiz
                                </button>
                            </div>
                            {isThursday ? (
                                quizCompleted ? (
                                    <div className="note-points text-center ">
                                        <h2>You have already completed the quiz.</h2>
                                        <p>Your score: {previousScore}/{questionsData.length}</p>
                                        <Link to={'/home'} style={{textDecoration:'none'}}>Back to home </Link>
                                    </div>
                                ) : (
                                    <div className="note-points container text-center">
                                        <h2>How to Attend the Quiz</h2>
                                        <ul className='text-center' style={{margin: '0', padding: '0' }}>
                                            Read each question carefully.<br></br>
                                            Select the correct answer from the given options.<br></br>
                                            
                                            Click "Next" to proceed to the next question.<br></br>
                                            If you reload, navigate back, or accidentally close the tab, the quiz will be automatically submitted. Please be careful while taking the quiz.
                                            <br></br>Complete all questions to see your result.
                                        </ul>
                                    </div>
                                )
                            ) : (
                                <div className="note-points">
                                    <h2>Note:</h2>
                                    <p>The quiz will be available on Sunday. Please come back then to participate.</p>
                                </div>
                            )}
                        </>
                    ) : showResult ? (
                        <QuizResult score={score} totalScore={questionsData.length} resetAll={resetAll} />
                    ) : quizCompleted ? (
                        <QuizResult score={score} totalScore={questionsData.length} resetAll={resetAll} />
                    ) : (
                        <>
                            <div className="question" style={{ fontWeight: 'bolder' }}>
                                <span id="question-number">{currentQuestion + 1}. </span>
                                <span id="question-txt" dangerouslySetInnerHTML={{ __html: questionsData[currentQuestion].question }}></span>
                            </div>
                            {questionsData[currentQuestion].codeSnippet && (
                                <div className="code-snippet" style={{ fontWeight: 'bolder', backgroundColor: 'lightyellow', color: 'green', borderRadius: '10px' }}>
                                    {questionsData[currentQuestion].codeSnippet.split('\n').map((line, index) => (
                                        <div key={index}>
                                            <code>{line}</code>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="option-container">
                                {questionsData[currentQuestion].options.map((option, i) => (
                                    <button
                                        className={`option-btn ${clickedOption === i + 1 ? "checked" : ""} ${feedback === 'wrong' && clickedOption === i + 1 ? "wrong" : ""}`}
                                        style={{ backgroundColor: correctAnswer === i + 1 ? "lightgreen" : "", fontWeight: 'bold' }}
                                        key={i}
                                        onClick={() => handleOptionClick(i + 1)}
                                        disabled={optionClicked}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="button"
                                value={currentQuestion === questionsData.length - 1 ? "Finish" : "Next"}
                                id="next-button"
                                onClick={changeQuestion}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Quiz;

