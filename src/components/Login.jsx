import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login({setLoginForm}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    const resetFields = () => {
        setEmail('');
        setPassword('');
    };

    const toggleForm = () => {
        resetFields(); 
        setLoginForm(false)
    };

    const handleLogin = () => {
        setLoading(true);
        if (!email || !password) {
            toast.error("All fields are mandatory!");
            setLoading(false);
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User:", user);
                toast.success("Logged in successfully!");
                setLoading(false);
                navigate("./dashboard");
            })
            .catch((error) => {
                console.error("Error Code:", error.code);
                console.error("Error Message:", error.message);
                toast.error(error.message);
                setLoading(false);
            });
    };

    return (
        <>
        <div className="login-box">
               <h2>Login to <span className='ll'>SmartSpend.</span></h2>
               <form onSubmit={(e) => e.preventDefault()}>
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
                   <button className="button1" type="button" disabled={loading} onClick={handleLogin}>
                       {loading ? "Loading..." : "Login"}
                   </button>
                   <p className="switch-form" onClick={toggleForm}>
                       Don't have an account? <span>Sign Up</span>
                   </p>
               </form>
           </div>
           </>
    );
}

export default Login;
