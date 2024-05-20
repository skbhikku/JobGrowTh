import React, { useContext } from 'react';
import Navbar from './Navbar';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
const Home = ({ className }) => {
    const { userEmail } = useContext(UserContext);
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    // Helper function to extract and format username
    const getUsername = (email) => {
        const username = email.split('@')[0];
        return username.charAt(0).toUpperCase() + username.slice(1);
    };
    const username = getUsername(userEmail);
    return (
        <>
        <Navbar />
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 className={className}>Welcome {username} To JobGrowTh Preparation </h1>
            </header>
            <section style={styles.section}>
                <h2>About Us</h2>
                <p>
                    Interview Prep is dedicated to helping you ace your interviews with comprehensive resources.<br></br> Our platform offers to you prepare Ineterview questions and Test your <strong>Skills</strong> with weekly quiz.
                </p>
            </section>
            <section style={styles.section}>
                <h2>Our Services</h2>
                <ul>
                   <p>
                    Interview Tips and Best Practices.<br></br>
                    Weekly Quizzes to Test Your Knowledge</p>
                </ul>
            </section>
            
            <section style={styles.section}>
                {dayOfWeek === 0     ? (
                    <div >
                        <h2>Sunday Quiz</h2>
                        <p>Take our weekly quiz to test your knowledge and improve your interview skills.</p>
                        <Link to={'/quiz'} style={styles.button}  >Start Quiz</Link>
                    </div>
                ) : (
                    <p>Our quiz is available every Sunday. Come back then to test your skills!</p>
                )}
            </section>


            <section style={styles.section}>
    <h3>Contact</h3>
    <p>If you have any queries, please contact <strong>solowarrior@gmail.com</strong>.</p>
</section>
        </div>
        </>
    );
};
const styles = {
    container: {
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'rgb(218, 191, 252)',
        
    },
    header: {
        color: 'rgb(44, 62, 80)',
        marginBottom: '2rem',
    },
    section: {
        margin: '2rem 0',
        padding: '1rem',
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        
    },
    quizSection: {
        marginTop: '2rem',
        padding: '1rem',
        border: '2px solid rgb(44, 62, 80)',
        borderRadius: '5px',
    },
    button: {
        padding: '0.5rem 1rem',
        backgroundColor: 'rgb(255, 215, 0)',
        color: 'rgb(44, 62, 80)',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        textDecoration:'none',
    },
};

export default Home;
