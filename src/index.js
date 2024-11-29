import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App';
import { FirebaseContext } from './store/Context';
import Context from './store/Context';
import { app, firestore, auth } from './firebase/config';

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with Firebase context
root.render(
    <FirebaseContext.Provider value={{ app, firestore, auth}}>
        <Context>
            <App />
        </Context>
    </FirebaseContext.Provider>

);