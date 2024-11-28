import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';


const API_KEY = process.env.REACT_APP_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET;
const MESSAGE_ID = process.env.REACT_APP_MESSAGE_ID;
const APP_ID = process.env.REACT_APP_APP_ID;
const MEASUREMENT_ID = process.env.REACT_APP_MEASUREMENT_ID;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};
export default initializeApp(firebaseConfig)       