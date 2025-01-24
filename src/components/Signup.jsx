import React, { useState } from 'react';
import "./Signup.css";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth, db,doc,provider,setDoc } from './firebase';
import Login from './Login';
import { getDoc } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading,setLoading]=useState(false);
    const [loginForm,setLoginForm]=useState(false);
    const navigate=useNavigate();

    const toggleForm = () => {
        setLoginForm(!loginForm);
    };

    const signUpWithEmail = () => {
        setLoading(true);
        console.log("Name:", fullName);
        if (!fullName || !email || !password || !confirmPassword) {
            toast.error("All fields are mandatory!");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }

        // Create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User:", user);
                toast.success("User created successfully!");
                setLoading(false);
                setPassword("");
                setConfirmPassword("");
                setEmail("");
                setFullName("");
                createDoc(user);
            })
            .catch((error) => {
                console.error("Error Code:", error.code);
                console.error("Error Message:", error.message);
                toast.error(error.message);
                setLoading(false);
            });
    };
    const createDoc= async (user) => {
        setLoading(true);
        if (!user) return;
    
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);
    
        if (!userData.exists()) {
          const { displayName, email, photoURL } = user;
          const createdAt = new Date();
    
          try {
            await setDoc(userRef, {
              name: displayName ? displayName : fullName,
              email,
              photoURL: user.photoURL ? user.photoURL : "",
              createdAt:new Date(),
            });
            toast.success("Account Created!");
            setLoading(false);
          } catch (error) {
            toast.error(error.message);
            console.error("Error creating user document: ", error);
            setLoading(false);
          }
        }else{
            setLoading(false);
        }
      };

      function googleAuth(){
        setLoading(true);
        try {
            signInWithPopup(auth, provider)
            .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            createDoc(user);
            
            toast.success("User Authenticated");
            setLoading(false);
            navigate("./dashboard");
          
        }).catch((error) => {
            
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            setLoading(false);
        });
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        } 
      }

    return (
        <>
        {loginForm ? (
            <Login setLoginForm={setLoginForm} />
            ) : (<div className="signup-box">
            <h2>Sign Up on <span className='ff'>SmartSpend.</span></h2>

            <form onSubmit={(e) => e.preventDefault()}>
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
                <button className="button1" 
                        type="button" 
                        onClick={signUpWithEmail}>
                {loading ? "Loading..." : "SignUp with Email and Password"}
                </button>
                <p className='or'>or</p>
                <button className="button2" 
                        type="button" onClick={googleAuth}>
                            SignUp with Google
                </button>
                <p className="switch-form" onClick={toggleForm}>
                    Already have an account? <span>Login</span>
                 </p>
            </form>
        </div>)}
        </>
    );
}

export default Signup;
