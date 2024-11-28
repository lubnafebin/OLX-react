import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import {useHistory} from 'react-router-dom'
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../../firebase/config';

export default function Signup() {
  const history=useHistory()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const {firebase} =useContext(FirebaseContext);
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(firebase);
    

    try {
      // Create user with email and password
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update the displayName (username)
      await updateProfile(result.user, {
        displayName: username,
      });

      // Add user to Firestore
      await addDoc(collection(firestore, 'users'), {
        id: result.user.uid,
        username: username,
        phone: phone,
      });

      // Redirect to login page
      history.push("/login");
    } catch (error) {
      console.error("Error signing up: ", error.message);
      // Handle errors (e.g., invalid email, weak password, etc.)
    }
  };
    
   
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
           
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
           
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
