// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDFyqVq7KQPh5jWELt_Oo3X9tuizzgoLbI',
  authDomain: 'housing-market-91051.firebaseapp.com',
  projectId: 'housing-market-91051',
  storageBucket: 'housing-market-91051.appspot.com',
  messagingSenderId: '961339855020',
  appId: '1:961339855020:web:ece0fd7136b043d8fb4f09',
  measurementId: 'G-Z8RV4XHG39',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getFirestore()
