import firebase from 'firebase/compat/app';
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyAlScXEWyxKer4DSnfdvmyb_J9I5zeeLVM",
    authDomain: "pokemon-game10.firebaseapp.com",
    databaseURL: "https://pokemon-game10-default-rtdb.firebaseio.com",
    projectId: "pokemon-game10",
    storageBucket: "pokemon-game10.appspot.com",
    messagingSenderId: "71471121799",
    appId: "1:71471121799:web:c6c21324c8480f7b4d3f22"
};

firebase.initializeApp(firebaseConfig);
export const fire = firebase;
export const database = firebase.database();

export default database;