// Import Firebase modules (add this at the top of your HTML file)
// Add these scripts BEFORE your firebase-init.js
<>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
</>

// In js/firebase-init.js
const firebaseConfig = {
  apiKey: "AIzaSyD-elt-urG-WZkJuqYXgB7qf1IGFM9Qi3k",
  authDomain: "boycott-guide.firebaseapp.com",
  projectId: "boycott-guide",
  storageBucket: "boycott-guide.appspot.com",
  messagingSenderId: "682549481687",
  appId: "1:682549481687:web:acc59444f700e4a99ce092",
  measurementId: "G-M33KN6ZDE0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();