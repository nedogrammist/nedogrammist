import * as firebase from "firebase";
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyA9rMP91hJwLt-wlgADSet_DXzHPb31ga0",
authDomain: "eprofit-4708a.firebaseapp.com",
projectId: "eprofit-4708a",
storageBucket: "eprofit-4708a.appspot.com",
messagingSenderId: "125444989191",
appId: "1:125444989191:web:1a941f361064cd4d01e5a2",
measurementId: "G-PK2C4M5ZFH"};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
