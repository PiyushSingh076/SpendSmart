import React, { useState } from 'react';
import "./SignUp.css";

function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            alert('Sign up successful!');
        } else {
            alert('Passwords do not match!');
        }
    };

    return (
        <div className="signup-box">
            <h2>Sign Up on <span className='ff'>SmartSpend.</span></h2>

            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter Full Name"
                        required
                    />
                </div>
                <div className="input-field">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="abc123@gmail.com"
                        required
                    />
                </div>
                <div className="input-field">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password_123"
                        required
                    />
                </div>
                <div className="input-field">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Password_123"
                        required
                    />
                </div>
                <button className="button1"type="submit">Sign Up with Email and password</button>
                <p className='or'>or</p>
                <button className="button2" type="submit">Sign Up with google</button>
            </form>
        </div>
    );
}

export default Signup;
