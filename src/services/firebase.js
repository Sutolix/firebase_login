import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDMRkIDyXdqvLy6rCw_38x98vkB50kZVUk",
  authDomain: "control-f-8eb4f.firebaseapp.com",
  databaseURL: "https://control-f-8eb4f.firebaseio.com",
  projectId: "control-f-8eb4f",
  storageBucket: "control-f-8eb4f.appspot.com",
  messagingSenderId: "910065145671",
  appId: "1:910065145671:web:01eef19e5655229b4d1e62",
  measurementId: "G-WHFHZEDYJF"
};

class Firebase {

  constructor() {
    // Initialize Firebase
    app.initializeApp(firebaseConfig);
    // app.analytics();

    this.app = app;
    this.database = app.database();
  }

  sendVerification() {
    const user = app.auth().currentUser;

    if(!user) return null;

    return user.sendEmailVerification();
  }

  isVerified() {

    const user = app.auth().currentUser;

    if(!user) return false;

    return user.emailVerified;
  }

  register(email, password) {
    return app.auth().createUserWithEmailAndPassword(email, password);    
  }

  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return app.auth().signOut();
  }

  getCurrentUser() {
    return app.auth().currentUser;
  }

  getUserInformations(callback) {
    const user = app.auth().currentUser;
    
    if(!user) return null;

    return app.database().ref('users').child(user.uid).once('value', callback);

  }

  liveUser(callback) {
    return app.auth().onAuthStateChanged(callback);
  }

}

export default new Firebase();