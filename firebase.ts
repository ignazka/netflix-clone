// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD_3nKucnLMOL9a2CcIYXAyDIMEzfIIF9k',
  authDomain: 'netflix-clone-95705.firebaseapp.com',
  projectId: 'netflix-clone-95705',
  storageBucket: 'netflix-clone-95705.appspot.com',
  messagingSenderId: '912092206004',
  appId: '1:912092206004:web:68826d89420e070f5758e1',
  measurementId: 'G-0JJ24PLSS5',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
const analytics = getAnalytics(app)
