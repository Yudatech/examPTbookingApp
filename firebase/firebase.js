import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const config={
  apiKey: "AIzaSyARvPY6Ueaw-WJpl_BoU6cUrhtQlGyJ7U0",
  authDomain: "personal-trainning-app-backend.firebaseapp.com",
  databaseURL: "https://personal-trainning-app-backend.firebaseio.com",
  projectId: "personal-trainning-app-backend",
  storageBucket: "personal-trainning-app-backend.appspot.com",
  messagingSenderId: "671866726229"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
const auth = firebase.auth();
const data = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
data.settings(settings);
export {
    auth,
    data,
    firebase
};