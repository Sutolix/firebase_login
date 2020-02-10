import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/*
const firebaseConfig = {
  Firebase database info
};

*/

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
