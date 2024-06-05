const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAGcmMph1RhNNhUlHOsaruXfDN5gZeUgWs",
  authDomain: "final-5dd18.firebaseapp.com",
  projectId: "final-5dd18",
  storageBucket: "final-5dd18.appspot.com",
  messagingSenderId: "170981709668",
  appId: "1:170981709668:web:ed0700f5e2f2628e4b4c71",
  measurementId: "G-C45Y4NDDPJ"
};

firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Data to add
const usersData = [
 
      {
        id:"",
        lastSignInTime: "",
        creationTime: "",
        email: "",
        location:"",
        user_name:"",
      
      },
      
  
  
];

// Function to add data to Firestore
const addusersToFirestore = async (usersData) => {
  try {
    // Loop through each post and add it to Firestore
    for (const user of usersData) {
      // Use set with merge to add or update the document
      await db
        .collection("users_forum")
        
        .add(user);
    }
    console.log("users added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding users to Firestore: ", error);
  }
};

// Call the function to add posts data to Firestore
addusersToFirestore(usersData);


