import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import css from '../Style/bar.css';

export default function Navbar({ className }) {
  const { userEmail } = useContext(UserContext);
  const isAdmin = userEmail === 'skbhikkusaheb@gmail.com';
 
  document.body.style.background = 'rgb(218 191 252)';

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-dark fixed-top bg-dark ${className}`} style={{ background: 'linear-gradient(to right, #101820, #FEE720, #66A5AD)' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">JobGrowTh</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/home">Home</a>
              {isAdmin && <a className="nav-link" href="/delete">Deleting</a>}
              {isAdmin && <a className="nav-link" href="/question">QuestionAdd</a>}
              {isAdmin && <a className="nav-link" href="/deleteuser">DeleteUser</a>}
              <a className="nav-link" href="/quiz">Quiz</a>
              {isAdmin && <a className="nav-link" href="/quizadd">Quizadd</a>}
              {isAdmin && <a className="nav-link" href="/userdata">UserData</a>}

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Programming Languages
                </a>
                <ul className="dropdown-menu" style={{ backgroundColor: 'black' }}>
                  <li><a className="dropdown-item" href="/Clanguage">C</a></li>
                  <li><a className="dropdown-item" href="/Cpluslanguage">C++</a></li>
                  <li><a className="dropdown-item" href="/java">Java</a></li>
                  <li><a className="dropdown-item" href="/python">Python</a></li>
                  <li><a className="dropdown-item" href="/swift">Swift</a></li>
                  <li><a className="dropdown-item" href="/datastructure">Data Structures</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Web Development
                </a>
                <ul className="dropdown-menu" style={{ backgroundColor: 'black' }}>
                  <li><a className="dropdown-item" href="/html">HTML</a></li>
                  <li><a className="dropdown-item" href="/css">CSS</a></li>
                  <li><a className="dropdown-item" href="/javascript">JavaScript</a></li>
                  <li><a className="dropdown-item" href="/Reactjs">React.js</a></li>
                  <li><a className="dropdown-item" href="/django">Django</a></li>
                </ul>
              </li>
              <a className="nav-link" href="/">Logout</a>

            </div>
          </div>
        </div>
      </nav>
      <div className='container text-center' style={{ marginTop: '80px' }}></div>
    </>
  );
}
