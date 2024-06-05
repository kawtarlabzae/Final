import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAGcmMph1RhNNhUlHOsaruXfDN5gZeUgWs",
  authDomain: "final-5dd18.firebaseapp.com",
  projectId: "final-5dd18",
  storageBucket: "final-5dd18.appspot.com",
  messagingSenderId: "170981709668",
  appId: "1:170981709668:web:ed0700f5e2f2628e4b4c71",
  measurementId: "G-C45Y4NDDPJ"
};


firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const projectFirestore = firebase.firestore()

const signInGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
   
    console.log('User signed in successfully:', result.user);
    
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};

export {auth,projectFirestore,signInGoogle}