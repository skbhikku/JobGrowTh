import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; // Import CSS file for neumorphic styling
import { Link } from 'react-router-dom';

function RegistrationForm() {
    document.body.style.background = 'rgb(218 191 252)';
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [state, setState] = useState('');
    const [university, setUniversity] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setPasswordError('');
        setEmailError('');

        // Validate email format
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            setEmailError('Invalid email format');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        // Check password strength
        const passwordStrength = checkPasswordStrength(password);
        if (passwordStrength !== 'strong') {
            setPasswordError(`Password is not strong enough. It should contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character.`);
            return;
        }

        try {
            const response = await axios.post('/api/register', { email, name, state, university, role, password });
            console.log(response.data);
            setEmail('');
            setName('');
            setPassword('');
            setConfirmPassword('');
            setRole('');
            setState('');
            setUniversity('');
            alert('Registered Successfully. Please login with your credentials');
        } catch (error) {
            console.error('Registration failed', error);
            if (error.response && error.response.data && error.response.data.message) {
                setEmailError(error.response.data.message);
            } else {
                alert('Registration failed: An unknown error occurred');
            }
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const checkPasswordStrength = (password) => {
        // Password strength rules
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[^\s]).{8,}$/;
        if (passwordRegex.test(password)) {
            return 'strong';
        } else {
            return 'weak';
        }
    };

    return (
        <div className="container text-center" style={{ marginTop: '5%', width: '30%' }}>
            <h4>Welcome to JobGrowTh</h4>
            <div className="card neumorphic">
                <div className="card-body">
                    <h5 className="card-title">Registration Form</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 neumorphic-input">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" required  autoComplete="username" />
                            {emailError && <p className="text-danger">{emailError}</p>}
                        </div>
                        <div className="mb-3 neumorphic-input">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" required />
                        </div>
                        <div className="mb-3 neumorphic-input">
                            <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="form-control" placeholder="State" required />
                        </div>
                        <div className="mb-3 neumorphic-input">
                            <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} className="form-control" placeholder="University" required  autoComplete="username" />
                        </div>
                        <div className="mb-3 neumorphic-input">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required autoComplete="current-password" />
                        </div>
                        <div className="mb-3 neumorphic-input">
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" placeholder="Confirm Password" required  autoComplete="current-password"/>
                            {passwordError && <p className="" style={{color:'red'}}>{passwordError}</p>}
                        </div>
                        <div className="mb-3 neumorphic-input">
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select" required>
                                <option value="">Select Role</option>
                                <option value="student">Student</option>
                                <option value="job">Job</option>
                                <option value="faculty">Faculty</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary text-black neumorphic-button">Register</button>
                    </form>
                </div>
            </div>
            <div className="btn btn-primary neumorphic-button my-3">
                <Link className='text-black' to="/Jobgrowth" style={{ textDecoration: 'none' }}>Login</Link>
            </div>
            <p className='text-danger'>Please remember your email and password because we currently do not offer a "forgot password" feature. Updates coming soon!</p>
        </div>
    );
}

export default RegistrationForm;
