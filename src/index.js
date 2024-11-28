import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App';
import { FirebaseContext } from './store/FirebaseContext';
import firebase from './firebase/config';

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with Firebase context
root.render(
    <FirebaseContext.Provider value={{ firebase }}>
        <App />
    </FirebaseContext.Provider>
);