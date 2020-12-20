import * as firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDN0nzUmq1j6sGhNetl_rcwjmsofECQfPw",
    authDomain: "reacttodoes.firebaseapp.com",
    databaseURL: "https://reacttodoes.firebaseio.com",
    projectId: "reacttodoes",
    storageBucket: "reacttodoes.appspot.com",
    messagingSenderId: "1058371096883",
    appId: "1:1058371096883:web:264efdb349e7f012ef2e46",
    measurementId: "G-ZWC56X8BQ3"
};

export default firebase.initializeApp(firebaseConfig);
