// App.js
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Deleting from './Components/Deleting';
import Webdevlop from './Components/Webdevlop';
import Questions from './Components/Question';
import Registration from './Components/RegistrationForm';
import Login from './Components/Login';
import Quiz from './Components/Quiz';
import { UserProvider } from './Components/UserContext';
import QuestionForm from './Components/QuestionForm';
import Home from './Components/Home';
import DeleteUser from './Components/DeleteUser';
import UserList from './Components/UserList';

export class App extends Component {
  render() {
    return (
      <div>
        <UserProvider>
          <BrowserRouter basename='/Jobgrowth'>
            <Routes>
              <Route path="/question" element={<Questions title="Top Interview Questions" />} />
              <Route path="/Jobgrowth" element={<Login></Login>} />
              <Route path="/userdata" element={<UserList></UserList>} />
              <Route path='/Navbar' element={<Navbar></Navbar>}/>
              <Route path="/deleteuser" element={<DeleteUser></DeleteUser>} />
              <Route path="/quiz" element={<Quiz></Quiz>} />
              <Route path="/quizadd" element={<QuestionForm></QuestionForm>} />
              <Route path="/home" element={<Home></Home>} />
              <Route path="/Registration" element={<Registration></Registration>} />
              <Route path="/delete" element={<Deleting />} />
              <Route path="/webdevelopment" element={<Webdevlop category="webdevelopment" title="Web Development" />} />
              <Route path="/Reactjs" element={<Webdevlop category="reactjs" title="React.js" />} />
              <Route path="/Clanguage" element={<Webdevlop category="clanguage" title="C" />} />
              <Route path="/java" element={<Webdevlop category="java" title="Java" />} />
              <Route path="/python" element={<Webdevlop category="python" title="Python" />} />
              <Route path="/Cpluslanguage" element={<Webdevlop category="cpluslanguage" title="C++" />} />
              <Route path="/html" element={<Webdevlop category="html" title="HTML" />} />
              <Route path="/javascript" element={<Webdevlop category="javascript" title="JavaScript" />} />
              <Route path="/css" element={<Webdevlop category="css" title="CSS" />} />
              <Route path="/django" element={<Webdevlop category="django" title="Django" />} />
              <Route path="/datastructure" element={<Webdevlop category="datastructure" title="Data Structure" />} />
              <Route path="/sql" element={<Webdevlop category="sql" title="SQL" />} />
              <Route path="/swift" element={<Webdevlop category="swift" title="Swift" />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </div>
    );
  }
}

export default App;
